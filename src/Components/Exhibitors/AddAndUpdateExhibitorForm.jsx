import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function getMaxExhibitorId(data) {
  if (data.length === 0) {
    return null;
  }

  const maxId = data.reduce((max, item) => {
    const id = parseInt(item.id, 10);
    return id > max ? id : max;
  }, -Infinity);

  return maxId;
}

const AddAndUpdateExhibitorForm = ({
  setIsOpen,
  exhibitors,
  setExhibitors,
  selectedObject,
}) => {
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
    let path = "http://localhost:8000/exhibitors";
    let method = "POST";
    if (selectedObject) {
      path += `/${selectedObject.id}`;
      method = "PUT";
    } else {
      exhibitor.id = getMaxExhibitorId(exhibitors) + 1;
    }
    fetch(path, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exhibitor),
    }).then(() => {
      if (selectedObject) {
        const index = exhibitors.findIndex(
          (item) => item.id === selectedObject.id
        );
        const updatedExhibitors = [...exhibitors];
        updatedExhibitors[index] = exhibitor;
        exhibitor.id = selectedObject.id;
        console.log(exhibitors, updatedExhibitors);

        setExhibitors(updatedExhibitors);
      } else {
        setExhibitors((prev) => [...prev, exhibitor]);
      }
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedObject) {
      setFirstName(selectedObject.firstName);
      setLastName(selectedObject.lastName);
      setEmail(selectedObject.email);
      setPhoneNumber(selectedObject.phoneNumber);
    }
  }, [selectedObject]);

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
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
        <button className="theme-button mt-3">Submit</button>
      </div>
    </form>
  );
};

export default AddAndUpdateExhibitorForm;
