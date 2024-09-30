import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fetchAndFindMaxId } from "../../Utils/Common";
import PhoneInput from "react-phone-number-validation";
import { _addEvent, _getEvent, _updateEvent } from "../../DAL/Events";
import ErrorMessage from "../../Components/GeneralComponents/ErrorMessage";

const EMPTY_OBJ = {
  title: "",
  hostName: "",
  contactNumber: "",
  description: "",
  venue: "",
  startDate: dayjs(new Date()),
  endDate: dayjs(new Date()),
};

const FIELD_LABELS = {
  title: "Title",
  hostName: "Host Name",
  contactNumber: "Contact Number",
  description: "Description",
  venue: "Venue",
  startDate: "Start Date",
  endDate: "End Date",
};

const AddOrUpdateEvents = () => {
  const [inputs, setInputs] = useState(EMPTY_OBJ);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event_id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangePhoneNumber = (value, country) => {
    // Handle phone number change
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

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

    if (inputs.contactNumber.length < 15) {
      setErrorMessage("Please enter a valid phone number");
      setError(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (event_id) {
      console.log("event ID", event_id);
      if (state) {
        console.log(state);
        setInputs({
          ...state,
          startDate: dayjs(state.startDate),
          endDate: dayjs(state.endDate),
        });
        setPhoneNumber(state.contactNumber);
      } else {
        _getEvent(event_id).then((data) => {
          console.log("Data", data);
          setInputs({
            ...data,
            startDate: dayjs(data.startDate),
            endDate: dayjs(data.endDate),
          });
        });
        setPhoneNumber(state.contactNumber);
      }
    }
  }, [event_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    inputs.contactNumber = phoneNumber;
    inputs.name = `${inputs.firstName} ${inputs.lastName}`;

    // validations
    if (!validateEvent(inputs)) {
      return;
    }

    if (event_id) {
      _updateEvent(inputs).then(() => {
        console.log("Event updated");
        setInputs(EMPTY_OBJ);
        navigate("/events");
      });
    } else {
      const id = await fetchAndFindMaxId("events");
      inputs.id = id + 1;
      inputs.id = inputs.id.toString();
      console.log(inputs);
      _addEvent(inputs).then(() => {
        console.log("Event added");
        setInputs(EMPTY_OBJ);
        navigate("/events");
      });
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
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title">{event_id ? "Update" : "Add"} Event</h2>
        </div>
      </div>
      {error && (
        <div className="row">
          <div className="col-12">
            {/* <div className="alert alert-danger mt-1" role="alert">
              {errorMessage}
            </div> */}
            <ErrorMessage message={errorMessage} setError={setError} />
          </div>
        </div>
      )}

      <form className="row" onSubmit={handleSubmit}>
        <div className="col-6">
          <TextField
            className="form-control mt-4 fw-bold"
            label="Title"
            name="title"
            variant="outlined"
            value={inputs.title}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Host Name"
            type="text"
            name="hostName"
            variant="outlined"
            value={inputs.hostName}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="col-6 mt-4">
          <PhoneInput
            inputClass="form-control input-phone custom-input"
            country="pk"
            required={true}
            value={phoneNumber} // Current value of the phone number input (required)
            setValue={setPhoneNumber} // Function to set the value of the phone number input (required)
            onChange={handleChangePhoneNumber} // Function called when the phone number changes (required)
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Venue"
            type="text"
            name="venue"
            variant="outlined"
            required={true}
            value={inputs.venue}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={inputs.startDate}
              className="form-control mt-4"
              onChange={(newValue) => handleDateChange("startDate", newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="col-12 col-md-6">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={inputs.endDate}
              className="form-control mt-4"
              onChange={(newValue) => handleDateChange("endDate", newValue)}
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
            multiline
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
