import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const AddExhibitorForm = ({ setIsOpen, updated, setUpdated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const exhibitor = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    fetch("http://localhost:8000/exhibitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exhibitor),
    }).then(() => {
      console.log("new exhibitor added");
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setUpdated(!updated);
    setIsOpen(false);
  };

  return (
    <div className="container" role="presentation">
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Phone Number"
            type="phone"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn custom-btn exhibitor-form-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExhibitorForm;
