import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { _addEvent, _getEvent, _updateEvent } from "../../DAL/Events";
import ErrorMessage from "../../Components/GeneralComponents/ErrorMessage";
import moment from "moment";
import { useSnackbar } from "../../Context/SnackbarContext";

const EMPTY_OBJ = {
  name: "",
  description: "",
  location: "",
  start_date: dayjs(new Date()),
  end_date: dayjs(new Date()),
  start_time: dayjs(new Date().getTime()),
  end_time: dayjs(new Date().getTime()),
  status: "",
  capacity: 0,
  numeber_of_attendees: 0,
  event_type: "conference",
};

const FIELD_LABELS = {
  name: "Event Name",
  description: "Description",
  location: "Location",
  start_date: "Start Date",
  end_date: "End Date",
  start_time: "Start Time",
  end_time: "End Time",
  status: "Event Status",
  capacity: "Capacity",
  number_of_attendees: "Number of Attendees",
  event_type: "Event Type",
};

const AddOrUpdateEvents = () => {
  const [inputs, setInputs] = useState(EMPTY_OBJ);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event_id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { showSnackbar } = useSnackbar();

  const validateEvent = (inputs) => {
    // Check for missing or null fields
    const missingFields = Object.keys(inputs).filter(
      (key) =>
        inputs[key] === null || inputs[key] === "" || inputs[key] === undefined
    );

    console.log(missingFields);

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields
        .map((field) => FIELD_LABELS[field])
        .join(", ");
      setErrorMessage(
        `Please fill in the following fields: ${missingFieldNames}`
      );
      setError(true);
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (event_id) {
      console.log("event ID", event_id);
      if (state) {
        console.log("data from prev page : ", state);
        setInputs({
          ...state,
          start_date: dayjs(state.start_date),
          end_date: dayjs(state.end_date),
          start_time: dayjs(state.start_time),
          end_time: dayjs(state.end_time),
        });
        setPhoneNumber(state.contactNumber);
      } else {
        _getEvent(event_id).then((data) => {
          console.log("Data from url : ", data);
          const event = data.event;
          setInputs({
            ...event,
            start_date: dayjs(event.start_date),
            end_date: dayjs(event.end_date),
            start_time: dayjs(event.start_time),
            end_time: dayjs(event.end_time),
          });
        });
      }
    }
  }, [event_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (!validateEvent(inputs)) {
      return;
    }

    const req = {};
    req.name = inputs.name;
    req.description = inputs.description;
    req.location = inputs.location;
    req.start_date = moment(inputs.start_date).format("YYYY:MM:DD");
    req.end_date = moment(inputs.end_date).format("YYYY:MM:DD");
    req.start_time = inputs.start_time;
    req.end_time = inputs.end_time;
    req.status = inputs.status;
    req.capacity = inputs.capacity;
    req.numeber_of_attendees = inputs.numeber_of_attendees;
    req.event_type = inputs.event_type;

    try {
      if (event_id) {
        const res = await _updateEvent(inputs._id, req);
        console.log(res);
        if (res.code === 200) {
          setInputs(EMPTY_OBJ);
          showSnackbar("Event updated successfully", "success");
          navigate("/events");
        } else {
          showSnackbar(res.message, "error");
        }
        console.log("Event updated");
      } else {
        console.log(inputs);
        const res = await _addEvent(req);
        console.log(res);
        if (res.code === 200) {
          showSnackbar("Event added successfully", "success");
          setInputs(EMPTY_OBJ);
          navigate("/events");
        } else {
          showSnackbar(res.message, "error");
        }
        console.log("Event added");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const handleDateChange = (name, date) => {
    setInputs({ ...inputs, [name]: date });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title">{event_id ? "Update" : "Add"} Event</h2>
        </div>
      </div>
      {error && (
        <div className="row">
          <div className="col-12">
            <ErrorMessage message={errorMessage} setError={setError} />
          </div>
        </div>
      )}

      <form className="row" onSubmit={handleSubmit}>
        <div className="col-6">
          <TextField
            className="form-control mt-4 fw-bold"
            label="Name"
            name="name"
            variant="outlined"
            value={inputs.name}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Capacity"
            type="number"
            name="capacity"
            variant="outlined"
            value={inputs.capacity}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="col-6 ">
          <TextField
            className="form-control mt-4"
            label="Number of Attendees"
            type="number"
            name="numeber_of_attendees"
            variant="outlined"
            required={true}
            value={inputs.numeber_of_attendees}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Location"
            type="text"
            name="location"
            variant="outlined"
            required={true}
            value={inputs.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-6 ">
          <TextField
            className="form-control mt-4"
            label="Event Type"
            type="text"
            name="event_type"
            variant="outlined"
            required={true}
            value={inputs.event_type}
            onChange={handleChange}
          />
        </div>
        <div className="col-6 mt-4">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={inputs.status}
              name="status"
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={"scheduled"}>Scheduled</MenuItem>
              <MenuItem value={"ongoing"}>Ongoing</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
              <MenuItem value={"cancelled"}>Cancelled</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="col-12 col-md-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={inputs.start_date}
              className="form-control mt-4"
              onChange={(newValue) => handleDateChange("start_date", newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="col-12 col-md-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={inputs.end_date}
              className="form-control mt-4"
              onChange={(newValue) => handleDateChange("end_date", newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="col-12 col-md-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              className="form-control mt-4"
              value={inputs.start_time}
              onChange={(newValue) => handleDateChange("start_time", newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="col-12 col-md-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="End Time"
              className="form-control mt-4"
              value={inputs.end_time}
              onChange={(newValue) => handleDateChange("end_time", newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="col-12">
          <textarea
            className="form-control mt-4 custom-textarea"
            placeholder="Description"
            type="text"
            name="description"
            variant="outlined"
            rows="4"
            required
            value={inputs.description}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="theme-button mt-3">
            {event_id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrUpdateEvents;
