import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  fetchAndFindMaxId,
  fetchAndGetMaxId,
  getMaxId,
} from "../../Utils/Common";

const EMPTY_OBJ = {
  title: "",
  hostname: "",
  contactNumber: "",
  description: "",
  venue: "",
  startDate: dayjs(new Date()),
  endDate: dayjs(new Date()),
};

const AddAndUpdateEvents = () => {
  const [inputs, setInputs] = useState(EMPTY_OBJ);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event_id } = useParams();

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
      } else {
        fetch(`http://localhost:8000/events/${event_id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Data", data);
            setInputs({
              ...data,
              startDate: dayjs(data.startDate, "DD-MM-YYYY, HH:mm:ss"),
              endDate: dayjs(data.endDate, "DD-MM-YYYY, HH:mm:ss"),
            });
          });
      }
    }
  }, [event_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await fetchAndFindMaxId("http://localhost:8000/events");
    inputs.id = id + 1;

    fetch(`http://localhost:8000/events/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }).then((response) => {
      console.log("Speaker Added Successfully", response);
      setInputs(EMPTY_OBJ);
    });

    navigate("/events");
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
    <div className="container bg-white p-md-5">
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title">Add Event</h2>
        </div>
      </div>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-12">
          <TextField
            className="form-control mt-4 fw-bold"
            label="Title"
            name="title"
            variant="outlined"
            value={inputs.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Host Name"
            type="text"
            name="hostname"
            variant="outlined"
            value={inputs.hostname}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Contact Number"
            type="tel"
            name="contactNumber"
            variant="outlined"
            value={inputs.contactNumber}
            onChange={handleChange}
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
            value={inputs.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <TextField
            className="form-control mt-4"
            label="Venue"
            type="text"
            name="venue"
            variant="outlined"
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
        <div className="d-flex justify-content-end">
          <button className="theme-button mt-3">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddAndUpdateEvents;
