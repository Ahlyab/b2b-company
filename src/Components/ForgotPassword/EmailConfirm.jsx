import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { logo } from "../../Assests";
import { Link } from "react-router-dom";
import { _email_verification } from "../../DAL/Admin";
import { useSnackbar } from "../../Context/SnackbarContext";

const EmailConfirm = ({ setComponentState }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     email: email,
  //     user_type: "admin",
  //   };

  //   localStorage.setItem("reset_pwd", JSON.stringify(data));

  //   _email_verification(data).then((res) => {
  //     console.log(res);
  //     if (res.status === 200) {
  //       setComponentState(2);
  //     } else {
  //       setError(true);
  //       setErrorMsg(res.message);
  //     }
  //     setComponentState(2);
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: email,
      user_type: "company",
    };

    // Store the data in localStorage
    localStorage.setItem("reset_pwd", JSON.stringify(data));

    try {
      // Await the email verification function
      const res = await _email_verification(data);
      console.log(res);

      // Handle response code
      if (res.code === 200) {
        setComponentState(2); // Success: Move to next step
      } else {
        showSnackbar(res.message, "error"); // Show snackbar with error message
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      showSnackbar("An error occurred. Please try again.", "error"); // Show snackbar with error message
    }

    setIsLoading(false);
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

            <Button
              variant="contained"
              type="submit"
              className=" w-100"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailConfirm;
