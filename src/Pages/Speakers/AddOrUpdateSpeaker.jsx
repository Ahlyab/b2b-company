import {
  Avatar,
  Button,
  IconButton,
  InputBase,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactEditor from "react-text-editor-kit";
import { fetchAndFindMaxId } from "../../Utils/Common";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { PhotoCamera } from "@mui/icons-material";

const EMPTY_OBJ = {
  name: "",
  email: "",
  bio: "",
  profileImg: "https://via.placeholder.com/150",
  phoneNumber: "",
};

const AddOrUpdateSpeaker = () => {
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

  if (speaker_id) {
    path += `/${speaker_id}`;
    method = "PUT";
  }

  const handleSubmit = async (e) => {
    inputs.detailedBio = value;
    e.preventDefault();

    if (method === "POST") {
      const id = await fetchAndFindMaxId("http://localhost:8000/speakers");
      inputs.id = id + 1;
    }

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
          <h2 className="drawer-title mb-4">{`${
            speaker_id ? "Edit" : "Add"
          } Speaker`}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <Avatar style={{ width: "90px", height: "90px" }} />
        </div>
      </div>

      <div className="row">
        <div className col-12 col-md-6>
          <form onSubmit={handleSubmit}>
            <div className="row mt-4">
              <div className="col-6">
                <label className="fw-bold" htmlFor="profile-upload">
                  Upload Profile Picture
                </label>
                <p className="text-muted">
                  Please upload an image in JPG, JPEG, or PNG format with
                  dimensions 300x300 pixels.
                </p>
              </div>
              <div className="col-6 text-end">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-image-input"
                  type="file"
                />
                <label htmlFor="profile-image-input">
                  <button
                    type="button"
                    className="theme-button"
                    onClick={() =>
                      document.getElementById("profile-image-input").click()
                    }
                  >
                    Upload Image
                  </button>
                </label>
              </div>
            </div>
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
                  label="Phone Number"
                  variant="outlined"
                  name="phoneNumber"
                  type="tel"
                  value={inputs.phoneNumber}
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

            {/* <div className="row">
              <div className="col-12">
                <ReactEditor
                  value={value}
                  onChange={handleChangeBio}
                  mainProps={{ className: "red" }} // these props with b used to most parent div of the editor
                  placeholder="Write your detailed Bio here"
                />
              </div>
            </div> */}

            <div className="row">
              <div className="col-12 text-end">
                <button type="submit" className="theme-button mt-2">
                  {speaker_id ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrUpdateSpeaker;
