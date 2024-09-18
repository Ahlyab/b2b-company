import { Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

const EditExhibitorForm = ({ title, updated, setUpdated, setIsOpen, data }) => {
  console.log(data);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [email, setEmail] = useState(data.email);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exhibitor = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };
    // update existing exhibitor
    fetch(`http://localhost:8000/exhibitors/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exhibitor),
    }).then(() => {
      console.log("exhibitor updated");
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setUpdated(!updated);
    setIsOpen(false);
  };

  return (
    <div className="exhibitor-form-div" role="presentation">
      {/* create a div and make items space between with bootstrap and also align items center */}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className={"exhibitor-form-heading"}>{title}</h3>
        <CloseIcon className="close-icon" onClick={() => setIsOpen(false)} />
      </div>
      <Divider />

      <form>
        {/* create a div and make content space-between content */}
        <div className="d-flex justify-content-between">
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
        </div>
        <div className="d-flex justify-content-between">
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
        </div>
        <div className="d-flex justify-content-end">
          <Button
            variant="contained"
            color="primary"
            className="exhibitor-form-submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditExhibitorForm;
