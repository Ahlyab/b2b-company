import { Button, TextField } from "@mui/material";
import React from "react";
import { logo } from "../../Assests";
import { Link, useNavigate } from "react-router-dom";

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
          <div className="d-flex justify-content-end mb-3 mt-0">
            <Link className="up" to="/">
              Back to Login
            </Link>
          </div>

          <Button variant="contained" type="submit" className=" w-100">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
