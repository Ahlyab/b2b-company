import React from "react";
import { loginImg, logo } from "../../Assests/index";
import ImageSection from "../../Components/Login/ImageSection";
import LoginForm from "../../Components/Login/LoginForm";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form">
          <img
            src={logo} // Placeholder logo
            alt="Logo"
            className="login-logo"
          />
          <h1 className="login-title">Login</h1>
          <LoginForm />
        </div>
      </div>

      <ImageSection img={loginImg} />
    </div>
  );
};

export default Login;
