import React from "react";
import Modal from "@mui/material/Modal";
import { Avatar, TextField } from "@mui/material";

const SpeakerDetailsModal = ({ handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title mb-2">Speaker Details</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <Avatar
            sx={{ width: 100, height: 100 }}
            src={selectedObject.profileImg}
          />
        </div>
      </div>
      <form className="row">
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 fw-bold "
            label="Name"
            name="name"
            variant="outlined"
            value={selectedObject.name}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            variant="outlined"
            value={selectedObject.phoneNumber}
            aria-readonly="true"
          />
        </div>
        <div className="col-12">
          <TextField
            className="form-control mt-4 "
            label="Email"
            type="tel"
            name="email"
            variant="outlined"
            value={selectedObject.email}
            aria-readonly="true"
          />
        </div>

        <div className="col-12">
          <TextField
            className="form-control mt-4"
            label="Bio"
            type="text"
            name="bio"
            variant="outlined"
            minRows={2}
            multiline
            value={selectedObject.bio}
            aria-readonly="true"
          />
        </div>

        <div className="d-flex justify-content-end">
          <button className="theme-button mt-3" onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default SpeakerDetailsModal;
