import * as React from "react";
import Modal from "@mui/material/Modal";
import { _deleteExhibitor } from "../../DAL/Exhibitors";
import { _deleteEvent } from "../../DAL/Events";
import { _deleteSpeaker } from "../../DAL/Speakers";

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

export default function DeleteModal({
  open,
  handleClose,
  selectedObject,
  data,
  setData,
  url,
}) {
  const updateData = (id) => {
    const updatedData = data.filter((item) => item._id !== id);
    setData(updatedData);
  };
  const handleDelete = () => {
    if (url === "events") {
      _deleteEvent(selectedObject._id).then(() => {
        console.log("event deleted");
        updateData(selectedObject._id);
      });
    } else if (url === "exhibitors") {
      _deleteExhibitor(selectedObject._id).then(() => {
        console.log("exhibitor deleted");
        updateData(selectedObject._id);
      });
    } else if (url === "speakers") {
      _deleteSpeaker(selectedObject._id).then((res) => {
        console.log(res);
        console.log("speaker deleted");
        updateData(selectedObject._id);
      });
    }
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ backgroundColor: "rgba(0, 0, 0, 5%)" }}
      >
        <div style={style} className="bg-white text-center p-md-5 delete-modal">
          <div class=" delete-modal-close" onClick={handleClose}>
            &times;
          </div>
          <h2 id="modal-modal-title" className="modal-modal-title">
            Are you sure?
          </h2>
          <p id="modal-modal-description">
            This data will be deteled permanently.
          </p>
          <div>
            <button className="btn theme-button m-1" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger m-1 delete-btn"
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
