import React from "react";
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
            label="First Name"
            name="firstName"
            variant="outlined"
            value={selectedObject.firstName}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 fw-bold "
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={selectedObject.lastName}
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
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={selectedObject.email}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Facebook"
            type="text"
            name="facebookURL"
            variant="outlined"
            value={selectedObject.facebookURL}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Twitter"
            type="text"
            name="twitterURL"
            variant="outlined"
            value={selectedObject.twitterURL}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Instagram"
            type="text"
            name="instagramURL"
            variant="outlined"
            value={selectedObject.instagramURL}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="LinkedIn"
            type="text"
            name="linkedinURL"
            variant="outlined"
            value={selectedObject.linkedInURL}
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
