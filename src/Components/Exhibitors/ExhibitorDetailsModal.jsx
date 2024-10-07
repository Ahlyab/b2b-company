import React from "react";
import { Avatar, TextField } from "@mui/material";
import { mediaUrl } from "../../config/config";
import { profile } from "../../Assests";

const ExhibitorDetailsModal = ({ open, handleClose, selectedObject }) => {
  selectedObject = selectedObject || {};
  const [fb, twitter, insta, linkedIn] = selectedObject.social_links || {};

  console.log(selectedObject);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h2 className="drawer-title">Exhibitor Details</h2>
        </div>
      </div>
      <div className=" delete-modal-close" onClick={handleClose}>
        &times;
      </div>
      <div className="col-12 d-flex justify-content-center mt-2">
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={
            selectedObject.image
              ? `${mediaUrl}${selectedObject?.image?.thumbnail_1}`
              : profile
          }
        />
      </div>
      <form className="row">
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 fw-bold "
            label="Name"
            name="name"
            variant="outlined"
            value={selectedObject.name}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="Company"
            variant="outlined"
            name="company"
            value={selectedObject.company?.name}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4 "
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={selectedObject.email}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Phone Number"
            type="phone"
            name="phoneNumber"
            variant="outlined"
            value={selectedObject.phone}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Status"
            type="text"
            name="status"
            variant="outlined"
            value={selectedObject.status}
            aria-readonly="true"
          />
        </div>
        <div className="col-12 col-md-6">
          <TextField
            className="form-control mt-4"
            label="Booth"
            type="text"
            name="booth"
            variant="outlined"
            value={selectedObject.booth}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4"
            label="Products/Services"
            type="text"
            name="products"
            variant="outlined"
            value={selectedObject.products_services}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Facebook"
            type="text"
            name="facebookURL"
            variant="outlined"
            value={fb?.url}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Twitter"
            type="text"
            name="twitterURL"
            variant="outlined"
            value={twitter?.url}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="Instagram"
            type="text"
            name="instagramURL"
            variant="outlined"
            value={insta?.url}
            aria-readonly="true"
          />
        </div>
        <div className="col-6">
          <TextField
            className="form-control mt-4 "
            label="LinkedIn"
            type="text"
            name="linkedinURL"
            variant="outlined"
            value={linkedIn?.url}
            aria-readonly="true"
          />
        </div>

        <div className="d-flex justify-content-end">
          <button className="theme-button mt-3" onClick={handleClose}>
            Close
          </button>
        </div>
      </form>
    </>
  );
};

export default ExhibitorDetailsModal;
