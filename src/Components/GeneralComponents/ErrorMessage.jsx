import React from "react";
// there should be close button also
const ErrorMessage = ({ message, setError, className }) => {
  return (
    <div className={"row w-100" + className}>
      <div
        className="alert alert-danger d-flex justify-content-between align-items-center"
        role="alert"
      >
        {message}
        <div
          style={{ fontSize: "24px", cursor: "pointer" }}
          className="fw-bold"
          onClick={(e) => setError(false)}
        >
          &times;
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
