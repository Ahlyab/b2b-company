import * as React from "react";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { Divider } from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

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
        <div
          onClick={toggleDrawer(false)}
          className="d-flex justify-content-between mt-2 mb-2"
        >
          <h2 className="drawer-title">{title}</h2>
          {/* <div className="cross-icon">X</div> */}
          <div class="close-button" onClick={toggleDrawer(false)}>
            &times;
          </div>
        </div>
        <Divider />
        {component}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
