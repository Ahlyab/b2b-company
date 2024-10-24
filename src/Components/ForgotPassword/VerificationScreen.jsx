import React, { useState } from "react";
import { logo } from "../../Assests";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { _verify_code } from "../../DAL/Admin";
import ErrorMessage from "../GeneralComponents/ErrorMessage";
import { useSnackbar } from "../../Context/SnackbarContext";

const VerificationScreen = ({ setComponentState }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("reset_pwd"));
    if (!user) {
      setError(true);
      setErrorMsg("Invalid User");
      return;
    }
    const data = {
      email: user.email,
      user_type: "admin",
      otp: otp,
    };

    console.log("Data before submission : ", data);

    // try {
    //   const res = await _verify_code(data);
    //   console.log(res);
    //   if (res.code === 200) {
    //     setComponentState(3);
    //   } else {
    //     showSnackbar(res.message, "error");
    //   }
    // } catch (error) {
    //   console.log("Error during code verification:", error);
    //   showSnackbar("An error occurred. Please try again.", "error");
    // }

    setComponentState(3);
  };
  return (
    <div className="forgot-password-form-container">
      <div className="forgot-password-form">
        <img src={logo} alt="Logo" className="forgot-password-logo" />
        <h1 className="forgot-password-title">Verification Code</h1>
        <p className="forgot-password-description">
          Enter the verification code sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
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
