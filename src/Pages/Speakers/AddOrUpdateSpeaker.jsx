import {
  Avatar,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchAndFindMaxId } from "../../Utils/Common";
import PhoneInput from "react-phone-number-validation";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { profile } from "../../Assests";
import { _addSpeaker, _getSpeaker, _updateSpeaker } from "../../DAL/Speakers";
import ErrorMessage from "../../Components/GeneralComponents/ErrorMessage";
import axios from "axios";
import { baseUrl } from "../../config/config";

const EMPTY_OBJ = {
  first_name: "",
  last_name: "",
  email: "",
  bio: "",
  image: profile,
  phone: "",
  expertise: "",
  facebookURL: "",
  twitterURL: "",
  instagramURL: "",
  linkedInURL: "",
  status: "true",
};

const FIELD_LABELS = {
  name: "Name",
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email",
  bio: "Bio",
  image: "Profile Image",
  phone: "Phone Number",
  facebookURL: "Facebook",
  twitterURL: "Twitter",
  instagramURL: "Instagram",
  linkedInURL: "LinkedIn",
  expertise: "Expertise",
  status: "status",
};

const AddOrUpdateSpeaker = () => {
  const [inputs, setInputs] = useState(EMPTY_OBJ);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { speaker_id } = useParams();
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangePhoneNumber = (value, country) => {
    // Handle phone number change
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

  const validateSpeaker = (inputs) => {
    // Check for missing or null fields
    const missingFields = Object.keys(inputs).filter(
      (key) =>
        // Check for non-social URLs and ensure their values are not null, empty, or undefined
        !["facebookURL", "twitterURL", "instagramURL", "linkedInURL"].includes(
          key
        ) &&
        (inputs[key] === null ||
          inputs[key] === "" ||
          inputs[key] === undefined)
    );

    console.log(missingFields);

    if (missingFields.length > 0) {
      // Set error message and error flag
      const missingFieldNames = missingFields
        .map((field) => FIELD_LABELS[field])
        .join(", ");
      setErrorMessage(
        `Please fill in the following fields: ${missingFieldNames}`
      );
      setError(true);
      return false; // Exit the function if there are missing fields
    }

    if (inputs.phone.length < 15) {
      setErrorMessage("Please enter a valid phone number");
      setError(true);
      return false;
    }

    return true;
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputs({
        ...inputs,
        image: file, // Set the image to the file, not the base64 string
      });
    }
  };

  const handleChangeBio = (value) => {
    setValue(value);
  };

  useEffect(() => {
    if (speaker_id) {
      console.log("Speaker ID", speaker_id);
      if (state) {
        setInputs(state);
        setValue(state.detailedBio);
        setPhoneNumber(state.phone);
      } else {
        _getSpeaker(speaker_id).then((data) => {
          console.log("Data", data);
          setInputs(data.company);
          setValue(data?.detailedBio);
          setPhoneNumber(data.company.phone);
        });
      }
    }
  }, [speaker_id]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   inputs.phone = phoneNumber;
  //   // inputs.name = `${inputs.first_name} ${inputs.last_name}`;

  //   // Validate the inputs
  //   if (!validateSpeaker(inputs)) {
  //     return;
  //   }

  //   const { facebookURL, twitterURL, instagramURL, linkedInURL } = inputs;
  //   // delete from urls
  //   delete inputs.facebookURL;
  //   delete inputs.twitterURL;
  //   delete inputs.instagramURL;
  //   delete inputs.linkedInURL;

  //   // Add social_links array to inputs
  //   inputs.social_links = [];

  //   // check if exists add to array
  //   if (facebookURL)
  //     inputs.social_links.push({ url: facebookURL, platform: "facebook" });
  //   if (twitterURL)
  //     inputs.social_links.push({ url: twitterURL, platform: "twitter" });
  //   if (instagramURL)
  //     inputs.social_links.push({ url: instagramURL, platform: "instagram" });
  //   if (linkedInURL)
  //     inputs.social_links.push({ url: linkedInURL, platform: "linkedin" });

  //   const formData = new FormData();

  //   // Append all inputs to formData
  //   for (const key in inputs) {
  //     if (inputs.hasOwnProperty(key)) {
  //       if (key === "image" && inputs.image instanceof File) {
  //         // formData.append(key, inputs.image); // Append the image file as 'image'
  //       } else {
  //         formData.append(key, inputs[key]);
  //       }
  //     }
  //   }

  //   console.log(inputs, formData);

  //   if (speaker_id) {
  //     _updateSpeaker(formData).then(() => {
  //       console.log("Speaker Updated Successfully");
  //       setInputs(EMPTY_OBJ);
  //       setError(false);
  //       navigate("/speakers");
  //     });
  //   } else {
  //     // const id = await fetchAndFindMaxId("speakers");
  //     // formData.append("id", (id + 1).toString());

  //     // _addSpeaker(formData).then((res) => {
  //     //   console.log(res);
  //     //   console.log("Speaker Added Successfully");
  //     // setInputs(EMPTY_OBJ);
  //     // setError(false);
  //     // navigate("/speakers");
  //     // });

  //     try {
  //       const res = await axios.post(
  //         baseUrl + "api/speaker/add_speaker",
  //         formData,
  //         { headers: { "x-sh-auth": localStorage.getItem("authToken") } }
  //       );
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    inputs.phone = phoneNumber;

    // Validate the inputs
    if (!validateSpeaker(inputs)) {
      return;
    }

    const { facebookURL, twitterURL, instagramURL, linkedInURL } = inputs;
    // Delete social URLs from the main object
    delete inputs.facebookURL;
    delete inputs.twitterURL;
    delete inputs.instagramURL;
    delete inputs.linkedInURL;

    // Initialize the social_links array only if there's a valid URL
    inputs.social_links = [];

    if (facebookURL) {
      inputs.social_links.push({ url: facebookURL, platform: "facebook" });
    }
    if (twitterURL) {
      inputs.social_links.push({ url: twitterURL, platform: "twitter" });
    }
    if (instagramURL) {
      inputs.social_links.push({ url: instagramURL, platform: "instagram" });
    }
    if (linkedInURL) {
      inputs.social_links.push({ url: linkedInURL, platform: "linkedin" });
    }

    // // Ensure that social_links is not empty; if it is, remove it from inputs
    // if (inputs.social_links.length === 0) {
    //   delete inputs.social_links; // This avoids sending an empty array
    // }

    const formData = new FormData();

    console.log("Is array:", Array.isArray(inputs.social_links));

    // Append all inputs to formData
    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        if (key === "image" && inputs.image instanceof File) {
          formData.append(key, inputs.image); // Append the image file as 'image'
        } else if (key === "social_links") {
          // Append the social_links array as a JSON string
          formData.append(key, JSON.stringify(inputs[key]));
        } else {
          formData.append(key, inputs[key]);
        }
      }
    }

    console.log(inputs, formData);

    if (speaker_id) {
      _updateSpeaker(formData).then(() => {
        console.log("Speaker Updated Successfully");
        setInputs(EMPTY_OBJ);
        setError(false);
        navigate("/speakers");
      });
    } else {
      _addSpeaker(formData).then((res) => {
        console.log(res);
        console.log("Speaker Added Successfully");
        // setInputs(EMPTY_OBJ);
        // setError(false);
        // navigate("/speakers");
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 ">
          <h2 className="drawer-title mb-4">{`${
            speaker_id ? "Edit" : "Add"
          } Speaker`}</h2>
        </div>
      </div>

      {error && (
        <div className="row">
          <div className="col-12">
            {/* <div className="alert alert-danger mt-1" role="alert">
              {errorMessage}
            </div> */}
            {error && (
              <ErrorMessage message={errorMessage} setError={setError} />
            )}
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6 mb-3">
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="first_name"
                  type="text"
                  value={inputs.first_name}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-6 mb-3">
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="last_name"
                  type="text"
                  value={inputs.last_name}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="text"
                  value={inputs.email}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-6 mb-3">
                <PhoneInput
                  inputClass="form-control input-phone custom-input"
                  country="pk"
                  value={phoneNumber} // Current value of the phone number input (required)
                  setValue={setPhoneNumber} // Function to set the value of the phone number input (required)
                  onChange={handleChangePhoneNumber} // Function called when the phone number changes (required)
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="Expertise"
                  variant="outlined"
                  name="expertise"
                  type="text"
                  value={inputs.expertise}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-6 mb-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={inputs.status}
                    name="status"
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div
              className="row my-3 align-items-center"
              style={{
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "10px",
              }}
            >
              <div className="col-4">
                <label className="fw-bold d-block" htmlFor="profile-upload">
                  Upload Profile Picture
                </label>
                <p className="text-muted d-inline">
                  Image size(1000 x 670)("JPG", "JPEG", "PNG")
                </p>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <Avatar
                  sx={{ height: "60px", width: "60px" }}
                  variant="square"
                  src={inputs.image}
                />
              </div>
              <div className="col-4 text-end">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-image-input"
                  type="file"
                  onChange={handleChangeImg}
                />
                <label htmlFor="profile-image-input">
                  <button
                    type="button"
                    className="theme-button"
                    onClick={() =>
                      document.getElementById("profile-image-input").click()
                    }
                  >
                    Upload Image
                  </button>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <textarea
                  className="form-control speaker-form-input custom-textarea"
                  id="outlined-basic"
                  placeholder="Bio"
                  variant="outlined"
                  name="bio"
                  rows="4"
                  type="text"
                  multiline
                  value={inputs.bio}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <h5 className="drawer-title my-3">Social Links</h5>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <TextField
                  label="Facebook"
                  variant="outlined"
                  name="facebookURL"
                  value={inputs.facebookURL}
                  onChange={handleChange}
                  placeholder="Facebook Username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FacebookIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-6">
                <TextField
                  label="Twitter"
                  variant="outlined"
                  name="twitterURL"
                  value={inputs.twitterURL}
                  onChange={handleChange}
                  placeholder="Twitter Username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <TextField
                  label="Instagram"
                  variant="outlined"
                  name="instagramURL"
                  value={inputs.instagramURL}
                  onChange={handleChange}
                  placeholder="Instragram Username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="col-6">
                <TextField
                  label="LinkedIn"
                  variant="outlined"
                  name="linkedInURL"
                  value={inputs.linkedInURL}
                  onChange={handleChange}
                  placeholder="LinkedIn Username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 text-end">
                <button type="submit" className="theme-button mt-2">
                  {speaker_id ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrUpdateSpeaker;
