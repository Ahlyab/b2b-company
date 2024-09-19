import React, { useState } from "react";
import ExhibitorsTable from "../../Components/Exhibitors/ExhibitorsTable";
import CustomDrawer from "../../Components/GeneralComponents/CustomDrawer";
import AddAndUpdateExhibitorForm from "../../Components/Exhibitors/AddAndUpdateExhibitorForm";

const Exhibitors = () => {
  const [updated, setUpdated] = useState(false);
  const [isopen, setisopen] = useState(false);

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
        <CustomDrawer
          title={"Add Exhibitor"}
          isOpen={isopen}
          setIsOpen={setisopen}
          updated={updated}
          setUpdated={setUpdated}
          component={
            <AddAndUpdateExhibitorForm
              title={"Add Exhibitor"}
              updated={updated}
              setUpdated={setUpdated}
              setIsOpen={setisopen}
            />
          }
        />
      </div>
      <ExhibitorsTable updated={updated} setUpdated={setUpdated} />
    </>
  );
};

export default Exhibitors;
