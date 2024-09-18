import React, { useEffect, useState } from "react";
import CustomDrawer from "../../Components/GeneralComponents/CustomDrawer";
import AddExhibitorForm from "../../Components/Exhibitors/AddExhibitorForm";
import { DataGrid } from "@mui/x-data-grid";
import DeleteModal from "../../Components/Exhibitors/DeleteModal";
import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import EditExhibitorForm from "../../Components/Exhibitors/EditExhibitorForm";

const Exhibitors = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState(null);
  const [updated, setUpdated] = useState(false);

  // for drawer
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  // edit
  const [rowData, setRowData] = useState(null);

  const handleEdit = (params) => {
    console.log(params);
    setRowData(params.row);
    setIsOpenEdit(true);
  };

  const handleDelete = (id) => {
    handleOpen();
    console.log(id);
    setId(id);
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
            handleDelete(params.row.id);
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
  }, [updated]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <h2>Exhibitors</h2>
          </div>
          <div className="col-6 text-end">
            <button className="btn custom-btn" onClick={handleOpenDrawer}>
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
            <DeleteModal
              setUpdated={setUpdated}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              id={id}
            />
          </div>
        </div>
      </div>
      <CustomDrawer
        title={"Add Exhibitor"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        component={
          <AddExhibitorForm
            setExhibitors={setExhibitors}
            setIsOpen={setIsOpen}
            updated={updated}
            setUpdated={setUpdated}
          />
        }
      />

      <CustomDrawer
        title={"Edit Exhibitor"}
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
        component={
          <EditExhibitorForm
            setExhibitors={setExhibitors}
            setIsOpen={setIsOpenEdit}
            updated={updated}
            setUpdated={setUpdated}
            data={rowData}
          />
        }
      />
    </>
  );
};
export default Exhibitors;
