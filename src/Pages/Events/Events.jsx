import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "../../Components/Exhibitors/DeleteModal";
import { useNavigate } from "react-router-dom";

function getMaxSpeakerId(data) {
  if (data.length === 0) {
    return null;
  }

  const maxId = data.reduce((max, item) => {
    const id = parseInt(item.id, 10);
    return id > max ? id : max;
  }, -Infinity);

  console.log("type of maxId", typeof maxId);

  return maxId;
}

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
  const [selectedObject, setSelectedObject] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSelectedObject(null);
    setOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedObject(row);
    handleOpen();
  };

  const handleAddSpeaker = () => {
    const id = getMaxSpeakerId(events);
    navigate("/events/add-speaker", { state: id + 1 });
  };

  const handleEditSpeaker = (row) => {
    console.log(row);
    console.log("type of row", typeof row);
    navigate(`/events/edit-speaker/${row.id}`, { state: row });
  };

  const columns = [
    { id: "id", label: "ID", type: "text" },
    {
      id: "title",
      label: "Title",
      type: "text",
    },
    {
      id: "startDate",
      label: "Start Date",
      type: "date",
      renderData: (row) => {
        return <>{formatDateTime(row.startDate)}</>;
      },
    },
    {
      id: "endDate",
      label: "End Date",
      type: "date",
      renderData: (row) => {
        return <>{formatDateTime(row.endDate)}</>;
      },
    },
    {
      id: "venue",
      label: "Venue",
      type: "text",
    },
    {
      id: "actions",
      label: "Actions",
      type: "actions",
      actions: ["edit", "delete"],
      renderData: (row) => {
        return (
          <div>
            <>
              <button className="btn" onClick={() => handleEditSpeaker(row)}>
                <EditIcon />
              </button>

              <button
                className="btn btn-danger"
                style={{ marginLeft: 16 }}
                onClick={() => {
                  handleDelete(row);
                }}
              >
                <DeleteOutline />
              </button>
            </>
          </div>
        );
      },
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
        const arr = data.map((item) => {
          item.name = item.title;
          item.descriptionFull = item.description;
          item.description = item.description.substring(0, 30) + "...";
          return item;
        });
        console.log(arr);
        setEvents(arr);
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
            <button className="theme-button">Add Events</button>
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
    </>
  );
};

export default Events;
