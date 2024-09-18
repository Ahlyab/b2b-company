import { Button } from "@mui/material";
import React, { useState } from "react";
import ExhibitorsTable from "../../Components/Exhibitors/ExhibitorsTable";
import AddExhibitorDrawer from "../../Components/Exhibitors/AddExhibitorDrawer";

const Exhibitors = () => {
  const [updated, setUpdated] = useState(false);
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
        <AddExhibitorDrawer updated={updated} setUpdated={setUpdated} />
      </div>
      <ExhibitorsTable updated={updated} />
    </>
  );
};

export default Exhibitors;
