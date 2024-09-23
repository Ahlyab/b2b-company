import React from "react";
import { TextField } from "@mui/material";

const ExhibitorDetailsModal = ({ open, handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title">Exhibitor Details</h2>
        </div>
      </div>
      <div className=" delete-modal-close" onClick={handleClose}>
        &times;
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
            className="form-control mt-4 "
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={selectedObject.lastName}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
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
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Phone Number"
            type="phone"
            name="phoneNumber"
            variant="outlined"
            value={selectedObject.phoneNumber}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Company Name"
            type="text"
            name="companyName"
            variant="outlined"
            value={selectedObject.companyName}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Business Nature"
            type="text"
            name="businessNature"
            variant="outlined"
            value={selectedObject.businessNature}
            aria-readonly="true"
          />
        </div>
        <div className="col-12">
          <TextField
            className="form-control mt-4"
            label="Address"
            type="text"
            name="address"
            variant="outlined"
            minRows={1}
            multiline
            value={selectedObject.address}
            aria-readonly="true"
          />
        </div>
        <div className="col-12">
          <TextField
            className="form-control mt-4"
            label="Exhibitor Info"
            type="text"
            name="exhibitorInfo"
            variant="outlined"
            minRows={2}
            multiline
            value={selectedObject.exhibitorInfo}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 ">
          <TextField
            className="form-control mt-4"
            label="Additional Info"
            type="text"
            name="additionalDetails"
            variant="outlined"
            minRows={1}
            multiline
            value={selectedObject.additionalDetails}
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

export default ExhibitorDetailsModal;
