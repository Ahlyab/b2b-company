import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const AddExhibitorForm = ({ updated, setUpdated }) => {
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
  };

  return (
    <form>
      <TextField
        className="exhibitor-form-input"
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <TextField
        className="exhibitor-form-input"
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <TextField
        className="exhibitor-form-input"
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        className="exhibitor-form-input"
        label="Phone Number"
        type="phone"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <Button
        variant="contained"
        color="primary"
        className="exhibitor-form-submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export default AddExhibitorForm;
