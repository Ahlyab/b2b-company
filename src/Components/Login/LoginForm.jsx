import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { _login } from "../../DAL/Admin";
import ErrorMessage from "../GeneralComponents/ErrorMessage";
import { useSnackbar } from "../../Context/SnackbarContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useContext(AuthContext);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { showSnackbar } = useSnackbar();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email,
      password,
      user_type: "company",
    };

    try {
      const res = await _login(data);
      console.log(res, res.status, res.token);

      if (res.code === 200) {
        console.log("token: ", res.token);
        login(res.token);
        localStorage.setItem("adminInfo", JSON.stringify(res.user));
        showSnackbar("Login successful", "success");
        navigate("/dashboard");
      } else {
        showSnackbar(res.message, "error");
      }
    } catch (error) {
      showSnackbar("An error occurred. Please try again.", "error");
      console.error("Login error: ", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      navigate(state ? state?.from?.pathname : "/dashboard");
    }
  }, [token]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <TextField
            className="input-field"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required={true}
          />
        </div>
        <div className="mb-3">
          <FormControl className="input-field">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              required={true}
              value={password}
              inputProps={{
                minLength: 8,
              }}
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
        <div className="d-flex justify-content-end mb-3 mt-0">
          <Link className="up" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <Button
          variant="contained"
          type="submit"
          className=" w-100"
          disabled={isLoading}
        >
          {isLoading ? "Please wait.." : "Login"}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
