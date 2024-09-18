import React, { useEffect, useState } from "react";
import ExhibitorsTable from "../../Components/Exhibitors/ExhibitorsTable";
import CustomDrawer from "../../Components/GeneralComponents/CustomDrawer";
import AddExhibitorForm from "../../Components/Exhibitors/AddExhibitorForm";
import { DataGrid } from "@mui/x-data-grid";
import DeleteModal from "../../Components/Exhibitors/DeleteModal";
import { Button } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

const Exhibitors = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState(null);

  // for drawer
  const [isOpen, setIsOpen] = useState(false);

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
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            handleDelete(params.row.id);
          }}
        >
          <DeleteOutline />
        </Button>
      ),
    },
    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   width: 150,
    //   renderCell: (params) => (
    //     <CustomDrawer
    //       title={<EditIcon />}
    //       isOpen={isOpen}
    //       setIsOpen={setIsOpen}
    //       updated={updated}
    //       setUpdated={setUpdated}
    //       component={
    //         <EditExhibitorForm
    //           title={"Edit Exhibitor"}
    //           updated={updated}
    //           setUpdated={setUpdated}
    //           setIsOpen={setIsOpen}
    //           data={params.row}
    //         />
    //       }
    //     />
    //   ),
    // },
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
            <h2>Exhibitors</h2>
          </div>
          <div className="col-6 text-end">
            <button variant="contained" onClick={handleOpenDrawer}>
              Add Exhibitor
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 exhibitor-table">
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
            {/* <DeleteModal
        setUpdated={setUpdated}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        id={id}
      /> */}
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
          />
        }
      />
    </>
  );
};
export default Exhibitors;
