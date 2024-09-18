import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

const CustomDrawer = ({ isOpen, setIsOpen, title, component }) => {
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <>
      <Drawer
        anchor={"right"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        className="m-0"
        PaperProps={{ className: "exhibitor-form-div" }}
      >
        <div className="d-flex justify-content-between">
          <h2>{title}</h2>
          <div className="cross-icon">x</div>
        </div>
        <Divider />
        {component}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
