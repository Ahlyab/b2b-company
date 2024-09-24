import React, { useEffect, useState } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "../../Components/GeneralComponents/DeleteModal";
import { useNavigate } from "react-router-dom";
import EventDetailModal from "../../Components/Events/EventDetailModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomModal from "../../Components/GeneralComponents/CustomModal";
import { CircularProgress } from "@mui/material";
import { fetchData, formatDateTime } from "../../Utils/Common";

const Events = () => {
  const [events, setEvents] = useState([]);
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

  const handleDetails = (row) => {
    const selectedObj = events.find((item) => item.id === row.id);
    setSelectedObject(selectedObj);
    showDetailsModal();
  };

  const handleClose = () => {
    setSelectedObject(null);
    setOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedObject(row);
    handleOpen();
  };

  const handleAddEvent = () => {
    navigate("/events/add-event");
  };

  const handleEditEvent = (row) => {
    navigate(`/events/edit-event/${row.id}`, { state: row });
  };

  const columns = [
    { label: "Actions", type: "action" },
    { id: "id", label: "ID" },
    {
      id: "title",
      label: "Title",
      handleClick: handleDetails,
      className: "cursor-pointer",
    },
    { id: "hostName", label: "Event Host" },
    { id: "start_date", label: "Start Date" },
    { id: "end_date", label: "End Date" },
    { id: "venue", label: "Venue" },
  ];

  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: <EditIcon />,
      handleClick: handleEditEvent,
    },
    {
      label: "Delete",
      icon: <DeleteOutlineIcon />,
      handleClick: handleDelete,
    },
  ];

  useEffect(() => {
    const manipulateDate = (data) => {
      return data.map((event) => {
        event.name = event.title;
        event.end_date = formatDateTime(event.endDate);
        event.start_date = formatDateTime(event.startDate);
        return event;
      });
    };

    fetchData(
      "http://localhost:8000/events",
      setEvents,
      setIsLoading,
      manipulateDate
    );
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h2 className="drawer-title d-inline-block">Events</h2>
          </div>
          <div className="col-6 text-end">
            <button className="theme-button" onClick={handleAddEvent}>
              Add Events
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
                data={events}
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
        data={events}
        setData={setEvents}
        selectedObject={selectedObject}
        url={"http://localhost:8000/events/"}
      />

      <CustomModal
        open={showDetails}
        handleClose={hideDetailsModal}
        component={
          <EventDetailModal
            handleOpen={showDetailsModal}
            handleClose={hideDetailsModal}
            selectedObject={selectedObject}
          />
        }
      />
    </>
  );
};

export default Events;
