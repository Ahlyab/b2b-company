import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ReactTable from "@meta-dev-zone/react-table";
import DeleteModal from "../../Components/GeneralComponents/DeleteModal";
import { useNavigate } from "react-router-dom";
import SpeakerDetailsModal from "../../Components/Speakers/SpeakerDetailsModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomModal from "../../Components/GeneralComponents/CustomModal";
import { CircularProgress } from "@mui/material";
import { _getSpeakers } from "../../DAL/Speakers";
import { baseUrl } from "../../config/config";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [open, setOpen] = useState(false); // Delete Modal
  const [showDetails, setShowDetails] = useState(false); // Details Modal
  const [selectedObject, setSelectedObject] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const showDetailsModal = () => {
    setShowDetails(true);
  };

  const hideDetailsModal = () => {
    setSelectedObject(null);
    setShowDetails(false);
  };

  const handleClose = () => {
    setSelectedObject(null);
    setOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedObject(row);
    handleOpen();
  };

  const handleAddSpeaker = () => {
    navigate("/speakers/add-speaker");
  };

  const handleEditSpeaker = (row) => {
    console.log(row);
    console.log("type of row", typeof row);
    navigate(`/speakers/edit-speaker/${row._id}`, { state: row });
  };

  const handleDetails = (row) => {
    const selectedObj = speakers.find((item) => item._id === row._id);
    setSelectedObject(selectedObj);
    showDetailsModal();
  };

  const columns = [
    { id: "actions", label: "Actions", type: "action" },
    { id: "id", label: "ID", type: "number" },
    {
      id: "speaker",
      label: "Speaker",
      className: "cursor-pointer",
      renderData: (row) => {
        return (
          <div onClick={(e) => handleDetails(row)}>
            <img
              src={`${baseUrl}${row.image?.thumbnail_1}`}
              alt="profile"
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 10,
              }}
            />
            <span>{row.name}</span>
          </div>
        );
      },
    },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone Number" },
  ];

  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: <EditIcon />,
      handleClick: handleEditSpeaker,
    },
    {
      label: "Delete",
      icon: <DeleteOutlineIcon />,
      handleClick: handleDelete,
    },
  ];

  useEffect(() => {
    _getSpeakers().then((res) => {
      console.log("data : ", res.speakers);
      // add name field to the data
      res.speakers.forEach((element) => {
        element.name = element.first_name + " " + element.last_name;
      });
      setSpeakers(res.speakers);

      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {isloading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <CircularProgress />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row mt-3 align-items-center">
            <div className="col-6">
              <h2 className="drawer-title d-inline-block">Speaker</h2>
            </div>
            <div className="col-6 text-end">
              <button className="theme-button" onClick={handleAddSpeaker}>
                Add Speaker
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 exhibitor-table mt-4">
              <ReactTable
                data={speakers}
                TABLE_HEAD={columns}
                is_sticky_header={false}
                is_hide_footer_pagination={false}
                is_hide_header_pagination={false}
                is_hide_search={true}
                MENU_OPTIONS={MENU_OPTIONS}
              />
            </div>
          </div>
        </div>
      )}

      <DeleteModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        data={speakers}
        setData={setSpeakers}
        selectedObject={selectedObject}
        url="speakers"
      />

      <CustomModal
        open={showDetails}
        handleClose={hideDetailsModal}
        component={
          <SpeakerDetailsModal
            handleOpen={showDetailsModal}
            handleClose={hideDetailsModal}
            selectedObject={selectedObject}
          />
        }
      />
    </>
  );
};

export default Speakers;
