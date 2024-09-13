import React, { useState } from "react";
import { loginImg } from "../../Assests/index";
import ImageSection from "../../Components/Login/ImageSection";
import EmailConfirm from "../../Components/ForgotPassword/EmailConfirm";
import VerificationScreen from "../../Components/ForgotPassword/VerificationScreen";
import ResetPassword from "../../Components/ForgotPassword/ResetPassword";

const ForgotPassword = () => {
  const [componentState, setComponentState] = useState(1);
  return (
    <div className="forgot-password-container">
      {componentState === 1 && (
        <EmailConfirm setComponentState={setComponentState} />
      )}
      {componentState === 2 && (
        <VerificationScreen setComponentState={setComponentState} />
      )}
      {componentState === 3 && <ResetPassword />}
      <ImageSection img={loginImg} />
    </div>
  );
};

export default ForgotPassword;
