import React, { useContext, useEffect, useState } from "react";
import { loginImg } from "../../Assests/index";
import ImageSection from "../../Components/Login/ImageSection";
import EmailConfirm from "../../Components/ForgotPassword/EmailConfirm";
import VerificationScreen from "../../Components/ForgotPassword/VerificationScreen";
import ResetPassword from "../../Components/ForgotPassword/ResetPassword";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [componentState, setComponentState] = useState(1);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(token);
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);
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
