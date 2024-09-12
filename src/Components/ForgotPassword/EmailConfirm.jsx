import { TextField } from "@mui/material";
import React from "react";

const EmailConfirm = () => {
  return (
    <form>
      <div className="mb-3">
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Send Reset Link
      </button>
    </form>
  );
};

export default EmailConfirm;
