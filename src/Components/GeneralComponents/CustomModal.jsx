import React from "react";
import Modal from "@mui/material/Modal";
import { Avatar, TextField } from "@mui/material";
import { Height } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  height: 650,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 3,
  p: 4,
};

const CustomModal = ({ open, handleClose, component }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ backgroundColor: "rgba(0, 0, 0, 5%)" }}
    >
      <div
        style={style}
        className="container bg-white text-center p-md-4 border-0 rounded-4 overflow-y-scroll"
      >
        <div className="delete-modal-close" onClick={handleClose}>
          &times;
        </div>
        {component}
      </div>
    </Modal>
  );
};

export default CustomModal;
