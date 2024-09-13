import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import React from "react";
import { AccountCircle } from "@mui/icons-material";
import ProfileIcon from "../../Components/AppHeader/ProfileIcon";

const AppHeader = ({ handleDrawerToggle, drawerWidth }) => {
  return (
    <AppBar
      color="transparent"
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          // className={"App-header-icon-menu"}
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <h6 className="App-header-title"></h6>
        {/* Div to push the profile icon to the right end */}
        <div style={{ flexGrow: 1 }} />

        <ProfileIcon />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
