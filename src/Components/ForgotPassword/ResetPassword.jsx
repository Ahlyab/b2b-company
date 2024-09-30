import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { logo } from "../../Assests";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { _reset_password } from "../../DAL/Admin";
import ErrorMessage from "../GeneralComponents/ErrorMessage";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password : ", password);
    console.log("Confirm Password : ", confirmPassword);

    if (password !== confirmPassword) {
      setError(true);
      setErrorMsg("Passwords do not match");
      return;
    }

    const user = JSON.parse(localStorage.getItem("reset_pwd"));
    if (!user) {
      setError(true);
      setErrorMsg("Invalid User");
      return;
    }

    const data = {
      email: user.email,
      user_type: "admin",
      password: password,
      confirm_password: confirmPassword,
    };

    console.log("Data before submission : ", data);

    _reset_password(data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate("/");
      } else {
        setError(true);
        setErrorMsg(res.message);
      }
    });

    localStorage.removeItem("reset_pwd");
    navigate("/");
  };

  const [showPassword, setShowPassword] = React.useState(false);

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
            {error && <ErrorMessage message={errorMsg} setError={setError} />}

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

          <Button variant="contained" type="submit" className=" w-100">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
