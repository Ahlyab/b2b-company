import { Avatar, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchAndFindMaxId } from "../../Utils/Common";
import PhoneInput from "react-phone-number-validation";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const EMPTY_OBJ = {
  name: "",
  email: "",
  bio: "",
  profileImg: "https://via.placeholder.com/150",
  phoneNumber: "",
};

const AddOrUpdateSpeaker = () => {
  const [inputs, setInputs] = useState(EMPTY_OBJ);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { speaker_id } = useParams();
  const [value, setValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangePhoneNumber = (value, country) => {
    // Handle phone number change
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setInputs({
        ...inputs,
        profileImg: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChangeBio = (value) => {
    setValue(value);
  };

  useEffect(() => {
    if (speaker_id) {
      console.log("Speaker ID", speaker_id);
      if (state) {
        setInputs(state);
        setValue(state.detailedBio); // Correctly updating the form data
      } else {
        fetch(`http://localhost:8000/speakers/${speaker_id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Data", data);
            setInputs(data);
            setValue(data?.detailedBio);
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

  let path = "http://localhost:8000/speakers";
  let method = "POST";

  if (speaker_id) {
    path += `/${speaker_id}`;
    method = "PUT";
  }

  const handleSubmit = async (e) => {
    inputs.detailedBio = value;
    e.preventDefault();

    if (method === "POST") {
      const id = await fetchAndFindMaxId("http://localhost:8000/speakers");
      inputs.id = id + 1;
    }

    fetch(path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }).then((response) => {
      console.log("Speaker Added Successfully", response);
      setInputs(EMPTY_OBJ);
    });
    navigate("/speakers");
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

      <div className="row">
        <div className col-12 col-md-6>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6 mb-3">
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="name"
                  type="text"
                  value={inputs.firstName}
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
                  name="lastName"
                  type="text"
                  value={inputs.lastName}
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
                  className="form-control phone-input"
                  style={{
                    outlineColor: "#dadada",
                    width: "100%",
                    height: "56px",
                    borderRadius: "4px",
                    border: "1px solid #dadada",
                  }}
                  value={phoneNumber} // Current value of the phone number input (required)
                  setValue={setPhoneNumber} // Function to set the value of the phone number input (required)
                  onChange={handleChangePhoneNumber} // Function called when the phone number changes (required)
                />
              </div>
            </div>

            <div className="row my-3">
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
                  sx={{
                    height: "60px",
                    width: "60px",
                    visibility: speaker_id ? "visible" : "hidden",
                  }}
                  variant="square"
                  src={inputs.profileImg}
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
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="Bio"
                  variant="outlined"
                  name="bio"
                  type="text"
                  multiline
                  value={inputs.bio}
                  onChange={handleChange}
                  minRows={4}
                  required={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-2">
                <h5 className="profile-update-heading">Social Links</h5>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <TextField
                  label="Facebook"
                  variant="outlined"
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
