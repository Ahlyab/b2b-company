import { TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <form>
      <div className="mb-3">
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          required
        />
      </div>
      <div className="mb-3">
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          required
        />
      </div>
      <div className="d-flex justify-content-end mb-2">
        <Link to="/forgot-password" className="text-decoration-none">
          Forgot Password?
        </Link>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
