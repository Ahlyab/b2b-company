import { Button } from "@mui/material";
import React, { useState } from "react";
import { logo } from "../../Assests";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { _reset_password } from "../../DAL/Admin";
import { useSnackbar } from "../../Context/SnackbarContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Password : ", password);
  //   console.log("Confirm Password : ", confirmPassword);

  //   if (password !== confirmPassword) {
  //     setError(true);
  //     setErrorMsg("Passwords do not match");
  //     return;
  //   }

  //   const user = JSON.parse(localStorage.getItem("reset_pwd"));
  //   if (!user) {
  //     setError(true);
  //     setErrorMsg("Invalid User");
  //     return;
  //   }

  //   const data = {
  //     email: user.email,
  //     user_type: "admin",
  //     password: password,
  //     confirm_password: confirmPassword,
  //   };

  //   console.log("Data before submission : ", data);

  //   _reset_password(data).then((res) => {
  //     console.log(res);
  //     if (res.status === 200) {
  //       navigate("/");
  //     } else {
  //       setError(true);
  //       setErrorMsg(res.message);
  //     }
  //   });

  //   localStorage.removeItem("reset_pwd");
  //   navigate("/");
  // };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Log password and confirm password
    console.log("Password : ", password);
    console.log("Confirm Password : ", confirmPassword);

    // Validate password match
    if (password !== confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }

    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("reset_pwd"));
    if (!user) {
      showSnackbar("Invalid User", "error");
      return;
    }

    // Create data object for reset password
    const data = {
      email: user.email,
      user_type: "admin",
      password: password,
      confirm_password: confirmPassword,
    };

    console.log("Data before submission : ", data);

    try {
      // Await the reset password function
      const res = await _reset_password(data);
      console.log(res);

      // Handle response
      if (res.code === 200) {
        localStorage.removeItem("reset_pwd");
        navigate("/"); // Navigate to home on success
      } else {
        showSnackbar(res.message, "error"); // Show snackbar with error message
      }
    } catch (error) {
      // Log and handle errors
      console.error("Error during password reset:", error);
      showSnackbar("An error occurred. Please try again.", "error"); // Show snackbar with error message
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="forgot-password-form-container">
      <div className="forgot-password-form">
        <img src={logo} alt="Logo" className="forgot-password-logo" />
        <h1 className="forgot-password-title">Reset Password</h1>
        <p className="forgot-password-description">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormControl className="input-field">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div className="mb-3">
            <FormControl className="input-field">
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                required={true}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </div>

          <Button
            variant="contained"
            type="submit"
            className=" w-100"
            disabled={isLoading}
          >
            {isLoading ? "Please Wait..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
