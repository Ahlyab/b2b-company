import { Avatar, Button, IconButton, TextField } from "@mui/material";
import React from "react";
import PasswordField from "../../Components/GeneralComponents/PasswordField";
import { Label } from "@mui/icons-material";

const UpdateProfile = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title">Update Profile</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <Avatar style={{ width: "90px", height: "90px" }} />
        </div>
      </div>
      <form>
        <div className="row mt-4">
          <div className="col-6">
            <label className="fw-bold" htmlFor="profile-upload">
              Upload Profile Picture
            </label>
            <p className="text-muted">
              Please upload an image in JPG, JPEG, or PNG format with dimensions
              300x300 pixels.
            </p>
          </div>
          <div className="col-6 text-end">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="profile-image-input"
              type="file"
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
        <div className="row mt-3">
          <div className="col-6">
            <TextField
              id="outlined-basic"
              label="Name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-6">
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              className="form-control"
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-6">
            <PasswordField
              label={"New Password"}
              className={"form-control"}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleMouseUpPassword={handleMouseUpPassword}
            />
          </div>
          <div className="col-6">
            <PasswordField
              label={"Confirm New Password"}
              className={"form-control"}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleMouseUpPassword={handleMouseUpPassword}
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
