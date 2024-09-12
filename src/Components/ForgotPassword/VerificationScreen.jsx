import React from "react";
import { logo } from "../../Assests";
import "./VerificationScreen.css";

const VerificationScreen = ({ setComponentState }) => {
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
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-input"
                autoFocus={index === 0}
                required
              />
            ))}
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
