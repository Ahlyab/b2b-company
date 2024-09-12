import { TextField } from "@mui/material";
import React from "react";
import { logo } from "../../Assests";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="forgot-password-form-container">
      <div className="forgot-password-form">
        <img src={logo} alt="Logo" className="forgot-password-logo" />
        <h1 className="forgot-password-title">Reset Password</h1>
        <p className="forgot-password-description">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextField
              className="input-field"
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              type="password"
              required
            />
          </div>
          <div className="mb-3">
            <TextField
              className="input-field"
              id="outlined-basic"
              label="Confirm New Password"
              variant="outlined"
              type="password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
