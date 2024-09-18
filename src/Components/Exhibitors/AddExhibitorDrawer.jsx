import * as React from "react";
import Drawer from "@mui/material/Drawer";
import AddExhibitorForm from "./AddExhibitorForm";
import { Divider } from "@mui/material";

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
      <Divider />
      <AddExhibitorForm updated={updated} setUpdated={setUpdated} />
    </div>
  );

  return (
    <>
      <Drawer anchor={"right"} open={state} onClose={toggleDrawer(false)}>
        {form()}
      </Drawer>
    </>
  );
}
