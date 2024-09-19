import React, { useEffect, useState } from "react";
import CustomDrawer from "../../Components/GeneralComponents/CustomDrawer";
import AddAndUpdateExhibitorForm from "../../Components/Exhibitors/AddAndUpdateExhibitorForm";
import { DataGrid } from "@mui/x-data-grid";
import DeleteModal from "../../Components/Exhibitors/DeleteModal";
import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

const Exhibitors = () => {
  const [open, setOpen] = useState(false); // Delete Modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSelectedObject(null);
    setOpen(false);
  };

  const handleEdit = (params) => {
    console.log(params);
    setSelectedObject(params.row);
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
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      type: "number",
      width: 250,
    },
    {
      field: "phoneNumber",
      headerName: "phoneNumber",
      width: 180,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-danger"
          style={{ marginLeft: 16 }}
          onClick={() => {
            handleDelete(params.row);
          }}
        >
          <DeleteOutline />
        </button>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <button className="btn" onClick={() => handleEdit(params)}>
          <EditIcon />
        </button>
      ),
    },
  ];

  const [exhibitors, setExhibitors] = useState([]);

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    fetch("http://localhost:8000/exhibitors", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setExhibitors(data);
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
          <div className="col-12 exhibitor-table mt-4">
            <DataGrid
              rows={exhibitors}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
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
        exhibitors={exhibitors}
        setExhibitors={setExhibitors}
        selectedObject={selectedObject}
      />
    </>
  );
};
export default Exhibitors;
