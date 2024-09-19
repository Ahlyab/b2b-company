import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteModal from "./DeleteModal";
import CustomDrawer from "../GeneralComponents/CustomDrawer";
import EditExhibitorForm from "./EditExhibitorForm";

export default function ExhibitorsTable({ updated, setUpdated }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState(null);

  // for drawer
  const [isopen, setisopen] = useState(false);

  const handleDelete = () => {
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
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <CustomDrawer
          title={<EditIcon />}
          isOpen={isopen}
          setIsOpen={setisopen}
          updated={updated}
          setUpdated={setUpdated}
          component={
            <EditExhibitorForm
              title={"Edit Exhibitor"}
              updated={updated}
              setUpdated={setUpdated}
              setIsOpen={setisopen}
              data={params.row}
            />
          }
        />
      ),
    },
  ];

  const [exhibitors, setExhibitors] = useState([]);
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
    <div className="exhibitor-table">
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
  );
}
