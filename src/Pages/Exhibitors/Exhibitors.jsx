import { Button } from "@mui/material";
import React from "react";
import ExhibitorsTable from "../../Components/Exhibitors/ExhibitorsTable";
import AddExhibitorDrawer from "../../Components/Exhibitors/AddExhibitorDrawer";

const Exhibitors = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h2>Exhibitors</h2>
        {/* <Button variant="contained" color="primary">
          Add Exhibitor
        </Button> */}
        <AddExhibitorDrawer />
      </div>
      <ExhibitorsTable />
    </>
  );
};

export default Exhibitors;
