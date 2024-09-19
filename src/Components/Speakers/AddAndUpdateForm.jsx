import React, { useState } from "react";

const AddAndUpdateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div
      className="main-speaker-div"
      //   style={{
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     height: "100vh",
      //   }}
    >
      <div
        className="speaker-form-div"
        // style={{
        //   width: "100%",
        //   maxWidth: "400px",
        //   padding: "20px",
        //   border: "1px solid #ccc",
        //   borderRadius: "10px",
        //   boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        // }}
      >
        <h2 style={{ textAlign: "center" }}>Speaker Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control speaker-form-input"
              //   style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              //   style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              className="form-control speaker-form-input"
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="form-control speaker-form-input"
              //   style={{ width: "100%", padding: "10px", marginTop: "5px" }}
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#5792c9",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAndUpdateForm;
