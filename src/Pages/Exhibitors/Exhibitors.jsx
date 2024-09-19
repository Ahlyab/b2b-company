import React, { useEffect, useState } from "react";
import CustomDrawer from "../../Components/GeneralComponents/CustomDrawer";
import AddAndUpdateExhibitorForm from "../../Components/Exhibitors/AddAndUpdateExhibitorForm";
import DeleteModal from "../../Components/Exhibitors/DeleteModal";
import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ReactTable from "@meta-dev-zone/react-table";

const Exhibitors = () => {
  const [open, setOpen] = useState(false); // Delete Modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [exhibitors, setExhibitors] = useState([]);

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSelectedObject(null);
    setOpen(false);
  };

  const handleEdit = (params) => {
    console.log(params);
    setSelectedObject(params);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setSelectedObject(null);
  };

  const handleDelete = (row) => {
    setSelectedObject(row);
    handleOpen();
  };

  const columns = [
    { id: "id", label: "ID" },
    { id: "firstName", label: "First name" },
    { id: "lastName", label: "Last name" },
    { id: "email", label: "Email" },
    { id: "phoneNumber", label: "phoneNumber" },
    {
      id: "actions",
      label: "Actions",
      type: "actions",
      actions: ["edit", "delete"],
      renderData: (row) => {
        return (
          <div>
            <>
              <button className="btn" onClick={() => handleEdit(row)}>
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
    fetch("http://localhost:8000/exhibitors", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const arr = data.map((item) => {
          return {
            ...item,
            name: item.name + " " + item.lastName,
          };
        });
        setExhibitors(arr);
      });
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h2 className="drawer-title d-inline-block">Exhibitors</h2>
          </div>
          <div className="col-6 text-end">
            <button className="theme-button" onClick={handleOpenDrawer}>
              Add Exhibitor
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 exhibitor-table mt-4 mb-2">
            <ReactTable
              data={exhibitors}
              TABLE_HEAD={columns}
              is_sticky_header={false}
              is_hide_footer_pagination={false}
              is_hide_header_pagination={false}
              is_hide_search={true}
            />
          </div>
        </div>
      </div>
      <CustomDrawer
        title={`${selectedObject ? "Edit" : "Add"} Exhibitor`}
        isOpen={isOpen}
        setIsOpen={closeDrawer}
        component={
          <AddAndUpdateExhibitorForm
            setExhibitors={setExhibitors}
            setIsOpen={closeDrawer}
            exhibitors={exhibitors}
            selectedObject={selectedObject}
          />
        }
      />

      <DeleteModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        data={exhibitors}
        setData={setExhibitors}
        selectedObject={selectedObject}
        url="http://localhost:8000/exhibitors/"
      />
    </>
  );
};
export default Exhibitors;
