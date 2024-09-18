import * as React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 3,
  p: 4,
};

export default function DeleteModal({ setUpdated, open, handleClose, id }) {
  const handleDelete = () => {
    fetch(`http://localhost:8000/exhibitors/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("exhibitor deleted");
      setUpdated((prev) => !prev);
      handleClose();
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="bg-white text-center p-md-5">
          <h2 id="modal-modal-title" className="text-danger">
            Are you sure?
          </h2>
          <p id="modal-modal-description">
            This data will be deteled permanently.
          </p>
          <div>
            <button className="btn custom-btn m-1" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger m-1 del-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
