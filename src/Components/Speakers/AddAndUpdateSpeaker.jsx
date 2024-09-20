import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactEditor from "react-text-editor-kit";

const EMPTY_OBJ = {
  name: "",
  email: "",
  bio: "",
  profileImg: "https://via.placeholder.com/150",
};

const AddAndUpdateSpeaker = () => {
  const [inputs, setInputs] = useState(EMPTY_OBJ);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { speaker_id } = useParams();
  const [value, setValue] = useState("");

  const handleChangeBio = (value) => {
    setValue(value);
  };

  useEffect(() => {
    if (speaker_id) {
      console.log("Speaker ID", speaker_id);
      if (state) {
        setInputs(state);
        setValue(state.detailedBio); // Correctly updating the form data
      } else {
        fetch(`http://localhost:8000/speakers/${speaker_id}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Data", data);
            setInputs(data);
            setValue(data?.detailedBio);
          });
      }
    }
  }, [speaker_id]);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  let path = "http://localhost:8000/speakers";
  let method = "POST";

  if (typeof state === "object") {
    path += `/${speaker_id}`;
    method = "PUT";
  } else {
    inputs.id = state.toString();
  }

  const handleSubmit = (e) => {
    inputs.detailedBio = value;
    e.preventDefault();
    fetch(path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }).then((response) => {
      console.log("Speaker Added Successfully", response);
      setInputs(EMPTY_OBJ);
    });
    navigate("/speakers");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 ">
          <h2 className="drawer-title mb-2">{`${
            typeof state === "object" ? "Edit" : "Add"
          } Speaker`}</h2>
        </div>
      </div>

      <div className="row">
        <div className col-12 col-md-6>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6 mb-3">
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="name"
                  type="text"
                  value={inputs.name}
                  onChange={handleChange}
                  required={true}
                />
              </div>
              <div className="col-6 mb-3">
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  value={inputs.email}
                  onChange={handleChange}
                  required={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-3">
                <TextField
                  className="form-control speaker-form-input"
                  id="outlined-basic"
                  label="Bio"
                  variant="outlined"
                  name="bio"
                  type="text"
                  multiline
                  value={inputs.bio}
                  onChange={handleChange}
                  minRows={4}
                  required={true}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <ReactEditor
                  value={value}
                  onChange={handleChangeBio}
                  mainProps={{ className: "red" }} // these props with b used to most parent div of the editor
                  placeholder="Write your detailed Bio here"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 text-end">
                <button type="submit" className="theme-button mt-2">
                  {typeof state === "number" ? "Submit" : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAndUpdateSpeaker;
