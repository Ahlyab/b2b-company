import React, { useEffect, useState } from "react";
import CustomDrawer from "../../Components/GeneralComponents/CustomDrawer";
import AddOrUpdateExhibitor from "../../Components/Exhibitors/AddOrUpdateExhibitor";
import DeleteModal from "../../Components/GeneralComponents/DeleteModal";
import EditIcon from "@mui/icons-material/Edit";
import ReactTable from "@meta-dev-zone/react-table";
import ExhibitorDetailsModal from "../../Components/Exhibitors/ExhibitorDetailsModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CustomModal from "../../Components/GeneralComponents/CustomModal";
import { CircularProgress } from "@mui/material";
import { fetchData } from "../../Utils/Common";
import { _getExhibitors } from "../../DAL/Exhibitors";

const Exhibitors = () => {
  const [open, setOpen] = useState(false); // Delete Modal
  const [showDetails, setShowDetails] = useState(false); // Details Modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [exhibitors, setExhibitors] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const showExhibitorDetailsModal = (e) => {
    setShowDetails(true);
  };

  const hideExhibitorDetailsModal = (e) => {
    setShowDetails(false);
    setSelectedObject(null);
  };

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

  const handleDetails = (row) => {
    const selectedObj = exhibitors.find((item) => item._id === row._id);

    setSelectedObject(selectedObj);

    console.log(row);
    setShowDetails(true);
  };

  const columns = [
    { id: "actions", label: "Actions", type: "action" },
    { id: "id", label: "ID", type: "number" },
    {
      id: "name",
      label: "Name",
      handleClick: handleDetails,
      className: "cursor-pointer",
    },

    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
    { id: "phone", label: "Phone Number" },
  ];

  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: <EditIcon />,
      handleClick: handleEdit,
    },
    {
      label: "Delete",
      icon: <DeleteOutlineIcon />,
      handleClick: handleDelete,
    },
  ];

  useEffect(() => {
    _getExhibitors().then((res) => {
      console.log("Data : ", res);
      setExhibitors(res.exhibitors);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isloading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <CircularProgress />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row mt-3 align-items-center">
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
                onClick={(e) => console.log(e)}
                data={exhibitors}
                TABLE_HEAD={columns}
                is_sticky_header={false}
                is_hide_footer_pagination={false}
                is_hide_header_pagination={false}
                is_hide_search={true}
                MENU_OPTIONS={MENU_OPTIONS}
              />
            </div>
          </div>
        </div>
      )}

      <CustomDrawer
        title={`${selectedObject ? "Edit" : "Add"} Exhibitor`}
        isOpen={isOpen}
        setIsOpen={closeDrawer}
        component={
          <AddOrUpdateExhibitor
            setExhibitors={setExhibitors}
            setIsOpen={closeDrawer}
            exhibitors={exhibitors}
            selectedObject={selectedObject}
          />
        }
      />

      <CustomModal
        open={showDetails}
        handleClose={hideExhibitorDetailsModal}
        component={
          <ExhibitorDetailsModal
            handleOpen={showExhibitorDetailsModal}
            handleClose={hideExhibitorDetailsModal}
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
        url="exhibitors"
      />
    </>
  );
};
export default Exhibitors;
