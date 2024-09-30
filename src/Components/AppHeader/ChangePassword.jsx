import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

const ChangePassword = ({ handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="row">
        <div className="col-12 mb-2">
          <h2 className="drawer-title mb-2">Change Password</h2>
        </div>
      </div>

      <form className="row">
        <div className="col-12 mb-3">
          <FormControl className="input-field w-100">
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              required={true}
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
              label="New Password"
            />
          </FormControl>
        </div>
        <div className="col-12">
          <FormControl className="input-field w-100">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              required={true}
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
              label="Confirm New Password"
            />
          </FormControl>
        </div>

        <div className="d-flex justify-content-end">
          <button className="theme-button mt-3" onClick={handleClose}>
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
