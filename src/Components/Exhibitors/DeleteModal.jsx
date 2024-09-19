import * as React from "react";
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

export default function DeleteModal({
  open,
  handleClose,
  selectedObject,
  exhibitors,
  setExhibitors,
}) {
  const handleDelete = () => {
    console.log(selectedObject.id);
    fetch(`http://localhost:8000/exhibitors/${selectedObject.id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("exhibitor deleted");
      const updatedExhibitors = exhibitors.filter(
        (item) => item.id !== selectedObject.id
      );
      setExhibitors(updatedExhibitors);
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
