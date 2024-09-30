import { Button, TextField } from "@mui/material";
import React from "react";
import { logo } from "../../Assests";
import { Link } from "react-router-dom";
import ErrorMessage from "../GeneralComponents/ErrorMessage";
import { _email_verification } from "../../DAL/Admin";

const EmailConfirm = ({ setComponentState }) => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      user_type: "admin",
    };

    localStorage.setItem("reset_pwd", JSON.stringify(data));

    _email_verification(data).then((res) => {
      console.log(res);
      // if (res.status === 200) {
      //   setComponentState(2);
      // } else {
      //   setError(true);
      //   setErrorMsg(res.message);
      // }
      setComponentState(2);
    });
  };

  return (
    <>
      <div className="forgot-password-form-container">
        <div className="forgot-password-form">
          <img src={logo} alt="Logo" className="forgot-password-logo" />
          <h1 className="forgot-password-title">Forgot Your Password</h1>
          <p className="forgot-password-description">
            Enter your email address below and we will send you OTP to reset
            your password.
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <ErrorMessage
                className={"input-field"}
                message={errorMsg}
                setError={setError}
              />
            )}

            <div className="mb-3">
              <TextField
                className="input-field"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
    </>
  );
};

export default EmailConfirm;
