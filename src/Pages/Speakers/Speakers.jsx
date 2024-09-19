import React, { useEffect, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ReactTable from "@meta-dev-zone/react-table";
import DeleteModal from "../../Components/Exhibitors/DeleteModal";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [open, setOpen] = useState(false); // Delete Modal
  const [selectedObject, setSelectedObject] = useState(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSelectedObject(null);
    setOpen(false);
  };

  const handleDelete = (row) => {
    setSelectedObject(row);
    handleOpen();
  };

  const columns = [
    { id: "id", label: "ID", type: "text" },
    {
      id: "profileImg",
      label: "Profile Image",
      type: "image",
      renderData: (row) => {
        return (
          <img
            src={row.profileImg}
            alt="profile"
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        );
      },
    },
    {
      id: "name",
      label: "Name",

      type: "text",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
    },

    {
      id: "bio",
      label: "Bio",
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
              <button className="btn">
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
    fetch("http://localhost:8000/speakers", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const arr = data.map((item) => {
          item.bio = item.bio.substring(0, 30) + "...";
          return item;
        });
        setSpeakers(arr);
      });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h2 className="drawer-title d-inline-block">Speaker</h2>
          </div>
          <div className="col-6 text-end">
            <button className="theme-button">Add Speaker</button>
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
            />
          </div>
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
    </>
  );
};

export default Speakers;
