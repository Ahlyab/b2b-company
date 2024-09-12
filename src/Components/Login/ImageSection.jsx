import React from "react";

const ImageSection = ({ img }) => {
  return (
    <div className="login-image" style={{ backgroundImage: `url(${img})` }} />
  );
};

export default ImageSection;
