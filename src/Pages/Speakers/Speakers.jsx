import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ReactTable from "@meta-dev-zone/react-table";
import DeleteModal from "../../Components/GeneralComponents/DeleteModal";
import { useNavigate } from "react-router-dom";
import SpeakerDetailsModal from "../../Components/Speakers/SpeakerDetailsModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomModal from "../../Components/GeneralComponents/CustomModal";
import { CircularProgress } from "@mui/material";
import { fetchData } from "../../Utils/Common";

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
    navigate(`/speakers/edit-speaker/${row.id}`, { state: row });
  };

  const handleDetails = (row) => {
    const selectedObj = speakers.find((item) => item.id === row.id);
    setSelectedObject(selectedObj);
    showDetailsModal();
  };

  const columns = [
    { id: "actions", label: "Actions", type: "action" },
    { id: "id", label: "ID" },
    {
      id: "speaker",
      label: "Speaker",
      className: "cursor-pointer",
      renderData: (row) => {
        return (
          <div onClick={(e) => handleDetails(row)}>
            <img
              src={row.profileImg}
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
    { id: "phoneNumber", label: "Phone Number" },
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
    fetchData("http://localhost:8000/speakers", setSpeakers, setIsLoading);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
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
          {isloading ? (
            <div className="d-flex justify-content-center align-items-center mt-5">
              <CircularProgress />
            </div>
          ) : (
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
          )}
        </div>
      </div>

      <DeleteModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        data={speakers}
        setData={setSpeakers}
        selectedObject={selectedObject}
        url={"http://localhost:8000/speakers/"}
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
