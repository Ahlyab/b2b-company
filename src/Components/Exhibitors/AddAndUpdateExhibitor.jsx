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

const EMPTY_OBJECT = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const AddAndUpdateExhibitor = ({
  setIsOpen,
  exhibitors,
  setExhibitors,
  selectedObject,
}) => {
  const [inputs, setInputs] = useState(EMPTY_OBJECT);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exhibitor = inputs;
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
    setInputs(EMPTY_OBJECT);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    if (selectedObject) {
      setInputs(selectedObject);
    }
  }, [selectedObject]);

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="First Name"
          name="firstName"
          variant="outlined"
          value={inputs.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={inputs.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          value={inputs.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4"
          label="Phone Number"
          type="phone"
          name="phoneNumber"
          variant="outlined"
          value={inputs.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex justify-content-end">
        <button className="theme-button mt-3">
          {selectedObject ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddAndUpdateExhibitor;
