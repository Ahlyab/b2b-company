import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

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
];

export default function ExhibitorsTable({ updated }) {
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
