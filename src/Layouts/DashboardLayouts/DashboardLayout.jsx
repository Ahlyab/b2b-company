import { Box, Toolbar } from "@mui/material";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./AppHeader";
import Sidebar from "./AppSidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 280;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    // if (!isClosing) {
    //   setMobileOpen(!mobileOpen);
    // }
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={"Dashboard-layout-container"}>
      <CssBaseline />
      <AppHeader
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setIsClosing={setIsClosing}
        drawerWidth={drawerWidth}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <div
        className={"Dashboard-layout-main"}
        style={{
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
