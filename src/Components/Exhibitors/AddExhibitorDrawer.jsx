import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AddExhibitorForm from "./AddExhibitorForm";

export default function AddExhibitorDrawer({ updated, setUpdated }) {
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
      <AddExhibitorForm updated={updated} setUpdated={setUpdated} />
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
