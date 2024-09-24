import React from "react";
import { TextField } from "@mui/material";

const EventDetailModal = ({ handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // Convert date to YYYY-MM-DD format
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title">Event Details</h2>
        </div>
      </div>

      <form className="row">
        <div className="col-12">
          <TextField
            className="form-control mt-4 fw-bold "
            label="Title"
            name="name"
            variant="outlined"
            value={selectedObject.name}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Host Name"
            type="text"
            name="hostName"
            variant="outlined"
            value={selectedObject.hostName}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Contact Number"
            type="tel"
            name="contactNumber"
            variant="outlined"
            value={selectedObject.contactNumber}
            aria-readonly="true"
          />
        </div>
        <div className="col-12">
          <TextField
            className="form-control mt-4"
            label="Description"
            type="text"
            name="description"
            variant="outlined"
            minRows={2}
            multiline
            value={selectedObject.description}
            aria-readonly="true"
          />
        </div>

        <div className="col-12">
          <TextField
            className="form-control mt-4"
            label="Venue"
            type="text"
            name="venue"
            variant="outlined"
            value={selectedObject.venue}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="Start Date"
            variant="outlined"
            name="startDate"
            type="date"
            value={formatDate(selectedObject.startDate)}
            aria-readonly="true"
          />
        </div>

        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="End Date"
            type="date"
            name="endDate"
            variant="outlined"
            value={formatDate(selectedObject.endDate)}
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

export default EventDetailModal;
