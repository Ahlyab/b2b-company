import { Avatar, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-validation";
import { _addExhibitor, _updateExhibitor } from "../../DAL/Exhibitors";
import ErrorMessage from "../GeneralComponents/ErrorMessage";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { mediaUrl } from "../../config/config";
import { useSnackbar } from "../../Context/SnackbarContext";
import { useNavigate } from "react-router-dom";

const EMPTY_OBJECT = {
  email: "",
  phone: "",
  social_links: "",
  products_services: "",
  status: "",
  image: "",
  booth: "",
  name: "",
  company: {
    _id: "6703ad92957ac08c04607764",
    name: "MetaLogix",
    website: "https://www.google.com",
  },
};

const FIELD_LABELS = {
  email: "Email",
  phone: "Phone Number",
  products_services: "Products/Services",
  status: "Status",
  image: "Image",
  booth: "Booth",
  name: "Name",
  company: "Company",
  facebookURL: "Facebook",
  twitterURL: "Twitter",
  instagramURL: "Instagram",
  linkedInURL: "LinkedIn",
};

const AddOrUpdateExhibitor = ({
  setIsOpen,
  exhibitors,
  setExhibitors,
  selectedObject,
}) => {
  const [inputs, setInputs] = useState(EMPTY_OBJECT);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [imgChanged, setImgChanged] = useState(false);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChangePhoneNumber = (value, country) => {
    // Handle phone number change
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgChanged(true);
      setInputs({
        ...inputs,
        image: file,
        // set img base 64 url to imgURL
        imgURl: URL.createObjectURL(file),
      });
    }
  };

  const validateExhibitor = (inputs) => {
    // Check for missing or null fields
    const missingFields = Object.keys(inputs).filter(
      (key) =>
        // Check for non-social URLs and ensure their values are not null, empty, or undefined
        ![
          "facebookURL",
          "twitterURL",
          "instagramURL",
          "linkedInURL",
          "social_links",
        ].includes(key) &&
        (inputs[key] === null ||
          inputs[key] === "" ||
          inputs[key] === undefined)
    );

    console.log(missingFields);

    if (missingFields?.length > 0) {
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

    if (inputs.phone?.length < 15) {
      setErrorMessage("Please enter a valid phone number");
      setError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputs.phone = phoneNumber;
    const exhibitor = inputs;

    // validations
    if (!validateExhibitor(exhibitor)) {
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

    const formData = new FormData();
    formData.append("email", exhibitor.email);
    formData.append("phone", exhibitor.phone);
    formData.append(
      "products_services",
      JSON.stringify(exhibitor.products_services)
    );
    formData.append("status", exhibitor.status);
    formData.append("booth", exhibitor.booth);
    formData.append("name", exhibitor.name);
    console.log(typeof exhibitor.company);
    formData.append("company", JSON.stringify(exhibitor.company));

    if (inputs.image && inputs.image instanceof File && imgChanged) {
      formData.append("image", inputs.image);
    }

    if (inputs.social_links?.length > 0) {
      formData.append("social_links", JSON.stringify(inputs.social_links));
    }

    // const req = {};
    // req.email = exhibitor.email;
    // req.phone = exhibitor.phoneNumber;
    // req.social_links = exhibitor.social_links;
    // req.products_services = exhibitor.products_services;
    // req.status = exhibitor.status;
    // req.image = exhibitor.image;
    // req.booth = exhibitor.booth;
    // req.name = exhibitor.name;
    // req.company = exhibitor.company;

    try {
      if (selectedObject) {
        console.log(selectedObject._id);
        const res = await _updateExhibitor(selectedObject._id, formData);
        if (res.code === 200) {
          console.log("exhibitor updated");
          showSnackbar("Exhibitor updated successfully", "success");
          const updatedExhibitors = exhibitors.map((item) =>
            item._id === selectedObject._id ? exhibitor : item
          );
          setExhibitors(updatedExhibitors);
          setIsOpen(false);
        } else {
          showSnackbar(res.message, "error");
          return;
        }
      } else {
        const res = await _addExhibitor(formData);

        if (res.code === 200) {
          console.log("exhibitor added");
          showSnackbar("Exhibitor added successfully", "success");
          setExhibitors([...exhibitors, exhibitor]);
          setIsOpen(false);
          navigate("/exhibitors");
        } else {
          setError(true);
          showSnackbar(res.message, "error");
          setErrorMessage(res.message);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      showSnackbar("Something went wrong", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    if (selectedObject) {
      console.log("Selected Object", selectedObject);
      setInputs({
        ...selectedObject,
        imgURl: selectedObject.image.thumbnail_1
          ? `${mediaUrl}${selectedObject.image.thumbnail_1}`
          : selectedObject.image,
      });
      setPhoneNumber(selectedObject.phone);
    }
  }, [selectedObject]);

  return (
    <form className="row" onSubmit={handleSubmit}>
      {/* {error && (
        <div className="alert alert-danger mt-1" role="alert">
          {errorMessage}
        </div>
      )} */}
      {error && <ErrorMessage message={errorMessage} setError={setError} />}
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="Name"
          name="name"
          variant="outlined"
          value={inputs.name}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="Company"
          variant="outlined"
          name="company"
          value={inputs.company.name}
          // onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          value={inputs.email}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-12 col-md-6">
        <PhoneInput
          inputClass="form-control input-phone custom-input mt-4"
          country="pk"
          value={phoneNumber} // Current value of the phone number input (required)
          setValue={setPhoneNumber} // Function to set the value of the phone number input (required)
          onChange={handleChangePhoneNumber} // Function called when the phone number changes (required)
          required={true}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4"
          label="Status"
          type="text"
          name="status"
          variant="outlined"
          value={inputs.status}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4"
          label="Booth"
          type="text"
          name="booth"
          variant="outlined"
          value={inputs.booth}
          onChange={handleChange}
          required={true}
        />
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
            src={inputs.imgURl}
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

      <div className="col-12">
        <TextField
          className="form-control mt-4"
          label="Products/Services"
          type="text"
          name="products_services"
          variant="outlined"
          value={inputs.products_services}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-6 mt-4">
        <TextField
          label="Facebook"
          variant="outlined"
          name="facebookURL"
          value={inputs.facebookURL}
          onChange={handleChange}
          placeholder="Facebook Profile URL"
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
      <div className="col-6 mt-4">
        <TextField
          label="Twitter"
          variant="outlined"
          name="twitterURL"
          value={inputs.twitterURL}
          onChange={handleChange}
          placeholder="Twitter Profile URL"
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

      <div className="col-6 mt-4">
        <TextField
          label="Instagram"
          variant="outlined"
          name="instagramURL"
          value={inputs.instagramURL}
          onChange={handleChange}
          placeholder="Instragram Profile URL"
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
      <div className="col-6 mt-4">
        <TextField
          label="LinkedIn"
          variant="outlined"
          name="linkedInURL"
          value={inputs.linkedInURL}
          onChange={handleChange}
          placeholder="LinkedIn Profile URL"
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

      <div className="d-flex justify-content-end">
        <button className="theme-button mt-3">
          {selectedObject ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddOrUpdateExhibitor;
