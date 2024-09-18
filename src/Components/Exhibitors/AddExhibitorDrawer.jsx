import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function AddExhibitorDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const form = () => (
    <div className="exhibitor-form-div" role="presentation">
      <h3 className={"exhibitor-form-heading"}>Add Exhibitor</h3>

      <form>
        <TextField
          className="exhibitor-form-input"
          label="First Name"
          variant="outlined"
        />
        <TextField
          className="exhibitor-form-input"
          label="Last Name"
          variant="outlined"
        />
        <TextField
          className="exhibitor-form-input"
          label="Email"
          variant="outlined"
        />
        <TextField
          className="exhibitor-form-input"
          label="Phone Number"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="exhibitor-form-submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Add Exhibitor
      </Button>
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
        {form()}
      </Drawer>
    </>
  );
}
