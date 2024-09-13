import React, { useState } from "react";
import { logo } from "../../Assests";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const VerificationScreen = ({ setComponentState }) => {
  const [otp, setOtp] = useState("");
  return (
    <div className="forgot-password-form-container">
      <div className="forgot-password-form">
        <img src={logo} alt="Logo" className="forgot-password-logo" />
        <h1 className="forgot-password-title">Verification Code</h1>
        <p className="forgot-password-description">
          Enter the verification code sent to your email.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setComponentState(3);
          }}
        >
          <div className="mb-3 verification-input-field ">
            <OtpInput
              value={otp}
              inputStyle={"otp-input"}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
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

export default VerificationScreen;
