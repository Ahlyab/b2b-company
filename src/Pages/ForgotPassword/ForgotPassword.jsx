import React, { useState } from "react";
import { loginImg, logo } from "../../Assests/index";
import "./ForgotPassword.css";
import ImageSection from "../../Components/Login/ImageSection";
import EmailConfirm from "../../Components/ForgotPassword/EmailConfirm";

const ForgotPassword = () => {
  const [componentState, setComponentState] = useState(1);
  return (
    <div className="forgot-password-container">
      {/* Form Section */}
      <div className="forgot-password-form-container">
        <div className="forgot-password-form">
          <img src={logo} alt="Logo" className="forgot-password-logo" />
          <h1 className="forgot-password-title">Forgot Your Password</h1>
          <p className="forgot-password-description">
            Enter your email address below and we will send you a link to reset
            your password.
          </p>

          <EmailConfirm />
        </div>
      </div>
      <ImageSection img={loginImg} />
    </div>
  );
};

export default ForgotPassword;
