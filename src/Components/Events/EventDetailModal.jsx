import React from "react";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

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
        <div className="col-6">
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
            label="Location"
            type="text"
            name="location"
            variant="outlined"
            value={selectedObject.location}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Capacity"
            name="contactNumber"
            variant="outlined"
            value={selectedObject.capacity}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Status"
            name="status"
            variant="outlined"
            value={selectedObject.status}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Number of Attendees"
            name="status"
            variant="outlined"
            value={selectedObject.numeber_of_attendees}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Event Type"
            name="status"
            variant="outlined"
            value={selectedObject.event_type}
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

        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="Start Date"
            variant="outlined"
            name="startDate"
            type="date"
            value={formatDate(selectedObject.start_date)}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="End Date"
            type="date"
            name="end_date"
            variant="outlined"
            value={formatDate(selectedObject.end_date)}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="Start Time"
            variant="outlined"
            name="start_time"
            type="date"
            value={selectedObject.start_time}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="End Time"
            type="date"
            name="end_time"
            variant="outlined"
            value={selectedObject.end_time}
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
