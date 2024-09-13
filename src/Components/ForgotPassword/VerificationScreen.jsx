import React, { useState } from "react";
import { logo } from "../../Assests";
import OtpInput from "react-otp-input";

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

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationScreen;
