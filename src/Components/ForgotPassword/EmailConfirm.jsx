import { Button, TextField } from "@mui/material";
import React from "react";
import { logo } from "../../Assests";
import { Link } from "react-router-dom";

const EmailConfirm = ({ setComponentState }) => {
  return (
    <div className="forgot-password-form-container">
      <div className="forgot-password-form">
        <img src={logo} alt="Logo" className="forgot-password-logo" />
        <h1 className="forgot-password-title">Forgot Your Password</h1>
        <p className="forgot-password-description">
          Enter your email address below and we will send you OTP to reset your
          password.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setComponentState(2);
          }}
        >
          <div className="mb-3">
            <TextField
              className="input-field"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
            />
          </div>

          <div className="d-flex justify-content-end mb-3 mt-0">
            <Link className="up" to="/">
              Back to Login
            </Link>
          </div>

          <Button variant="contained" type="submit" className=" w-100">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EmailConfirm;
