import React, { useEffect, useState } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "../../Components/Exhibitors/DeleteModal";
import { useNavigate } from "react-router-dom";
import EventDetailModal from "../../Components/Events/EventDetailModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomModal from "../../Components/GeneralComponents/CustomModal";

function formatDateTime(dateString) {
  const date = new Date(dateString);

  // Extracting date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed in JS
  const year = date.getFullYear();

  // Extracting time components
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Converting 24-hour format to 12-hour format
  hours = hours % 12 || 12; // 0 should be shown as 12

  // Formatting time with leading zeros if needed
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Final formatted string
  const formattedDate = `${day}-${month}-${year}, ${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

  return formattedDate;
}

const Events = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false); // Delete Modal
  const [showDetails, setShowDetails] = useState(false); // Details Modal
  const [selectedObject, setSelectedObject] = useState(null);
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
    { id: "hostname", label: "Event Host" },
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
    fetch("http://localhost:8000/events", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const eventArr = data.map((event) => {
          event.name = event.title;
          event.end_date = formatDateTime(event.endDate);
          event.start_date = formatDateTime(event.startDate);
          return event;
        });
        console.log(eventArr);
        setEvents(eventArr);
      });
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
