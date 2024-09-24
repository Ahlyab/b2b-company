import { Avatar, Badge, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-validation";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const UpdateProfile = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [img, setImg] = useState("");

  const handleChange = (value, country) => {
    // Handle phone number change
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title">Update Profile</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center mb-3">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <CameraAltIcon sx={{ color: "#5792c9", cursor: "pointer" }} />
            }
            onClick={() =>
              document.getElementById("profile-image-input").click()
            }
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-image-input"
              type="file"
              onChange={handleChangeImg}
            />
            <Avatar
              sx={{ width: 80, height: 80, cursor: "pointer" }}
              src={img}
            />
          </Badge>
        </div>
      </div>
      <form>
        <div className="row mt-3">
          <div className="col-6">
            <TextField
              id="outlined-basic"
              label="First Name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-6">
            <TextField
              id="outlined-basic"
              label="Last Name"
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-6">
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              className="form-control"
            />
          </div>
          <div className="col-6 ">
            <PhoneInput
              inputClass="form-control input-phone custom-input"
              value={phoneNumber} // Current value of the phone number input (required)
              setValue={setPhoneNumber} // Function to set the value of the phone number input (required)
              onChange={handleChange} // Function called when the phone number changes (required)
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <textarea
              id="outlined-basic"
              placeholder="Address"
              type="text"
              rows="4"
              multiline
              className="form-control custom-textarea"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-end">
            <button className="theme-button">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
