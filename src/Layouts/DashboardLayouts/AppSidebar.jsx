import { Drawer } from "@mui/material";
import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { DashboardCustomizeOutlined } from "@mui/icons-material";
import InterpreterModeOutlinedIcon from "@mui/icons-material/InterpreterModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logo } from "../../Assests";

const AppSidebar = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerClose,
}) => {
  const location = useLocation();

  const options = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardCustomizeOutlined />,
    },
    {
      title: "Exhibitors",
      path: "/exhibitors",
      icon: <PersonOutlineOutlinedIcon />,
    },
    {
      title: "Speakers",
      path: "/speakers",
      icon: <InterpreterModeOutlinedIcon />,
    },
    {
      title: "Events",
      path: "/events",
      icon: <CalendarMonthOutlinedIcon />,
    },
  ];
  const drawer = (
    <div>
      <div style={{ padding: "16px", textAlign: "center" }}>
        <img
          src={logo} // Placeholder logo URL
          alt="Logo"
          style={{ width: "100px", height: "auto" }} // Adjust size as needed
        />
      </div>
      <Divider className="divider" />
      <List>
        {options.map((option, index) => (
          <ListItem
            key={index}
            disablePadding
            className={
              location.pathname.includes(option.path) ? "active-tab" : ""
            }
          >
            <ListItemButton LinkComponent={Link} to={option.path}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div
      className="drawer-container"
      style={{ "--drawer-width": `${drawerWidth}px` }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        className="drawer-temporary"
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        className="drawer-permanent"
        open
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default AppSidebar;
