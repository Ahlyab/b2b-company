import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMaxId } from "../../Utils/Common";
import PhoneInput from "react-phone-number-validation";
import { _addExhibitor, _updateExhibitor } from "../../DAL/Exhibitors";
import ErrorMessage from "../GeneralComponents/ErrorMessage";

const EMPTY_OBJECT = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  businessNature: "",
  address: "",
  exhibitorInfo: "",
  additionalDetails: "",
};

const FIELD_LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phoneNumber: "Phone Number",
  companyName: "Company Name",
  businessNature: "Business Nature",
  address: "Address",
  exhibitorInfo: "Exhibitor Info",
  additionalDetails: "Additional Info",
};

const AddOrUpdateExhibitor = ({
  setIsOpen,
  exhibitors,
  setExhibitors,
  selectedObject,
}) => {
  const [inputs, setInputs] = useState(EMPTY_OBJECT);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const handleChangePhoneNumber = (value, country) => {
    // Handle phone number change
    console.log("Phone Number:", value);
    console.log("Selected Country:", country);
    setPhoneNumber(value);
  };

  const validateExhibitor = (inputs) => {
    // Check for missing or null fields
    const missingFields = Object.keys(inputs).filter(
      (key) =>
        key !== "additionalDetails" &&
        (inputs[key] === null ||
          inputs[key] === "" ||
          inputs[key] === undefined)
    );

    console.log(missingFields);

    if (missingFields.length > 0) {
      // Set error message and error flag
      const missingFieldNames = missingFields
        .map((field) => FIELD_LABELS[field])
        .join(", ");
      setErrorMessage(
        `Please fill in the following fields: ${missingFieldNames}`
      );
      setError(true);
      return false; // Exit the function if there are missing fields
    }

    if (inputs.phoneNumber.length < 15) {
      setErrorMessage("Please enter a valid phone number");
      setError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputs.phoneNumber = phoneNumber;
    const exhibitor = inputs;

    // validations
    if (!validateExhibitor(exhibitor)) {
      return;
    }

    if (selectedObject) {
      _updateExhibitor(exhibitor).then(() => {
        console.log("exhibitor updated");
        const updatedExhibitors = exhibitors.map((item) =>
          item.id === selectedObject.id ? exhibitor : item
        );
        setExhibitors(updatedExhibitors);
      });
    } else {
      exhibitor.id = getMaxId(exhibitors) + 1;
      _addExhibitor(exhibitor).then(() => {
        console.log("exhibitor added");
        setExhibitors([...exhibitors, exhibitor]);
      });
    }
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
      setPhoneNumber(selectedObject.phoneNumber);
    }
  }, [selectedObject]);

  return (
    <form className="row" onSubmit={handleSubmit}>
      {/* {error && (
        <div className="alert alert-danger mt-1" role="alert">
          {errorMessage}
        </div>
      )} */}
      {error && <ErrorMessage message={errorMessage} setError={setError} />}
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4 "
          label="First Name"
          name="firstName"
          variant="outlined"
          value={inputs.firstName}
          onChange={handleChange}
          required={true}
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
          required={true}
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
          required={true}
        />
      </div>
      <div className="col-12 col-md-6">
        <PhoneInput
          inputClass="form-control input-phone custom-input mt-4"
          country="pk"
          value={phoneNumber} // Current value of the phone number input (required)
          setValue={setPhoneNumber} // Function to set the value of the phone number input (required)
          onChange={handleChangePhoneNumber} // Function called when the phone number changes (required)
          required={true}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4"
          label="Company Name"
          type="text"
          name="companyName"
          variant="outlined"
          value={inputs.companyName}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-12 col-md-6">
        <TextField
          className="form-control mt-4"
          label="Business Nature"
          type="text"
          name="businessNature"
          variant="outlined"
          value={inputs.businessNature}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-12">
        <TextField
          className="form-control mt-4"
          label="Address"
          type="text"
          name="address"
          variant="outlined"
          minRows={2}
          multiline
          value={inputs.address}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-12">
        <TextField
          className="form-control mt-4"
          label="Exhibitor Info"
          type="text"
          name="exhibitorInfo"
          variant="outlined"
          minRows={2}
          multiline
          value={inputs.exhibitorInfo}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="col-12 ">
        <TextField
          className="form-control mt-4"
          label="Additional Info"
          type="text"
          name="additionalDetails"
          variant="outlined"
          minRows={2}
          multiline
          value={inputs.additionalDetails}
          onChange={handleChange}
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

export default AddOrUpdateExhibitor;
