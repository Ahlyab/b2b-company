import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import KeyIcon from "@mui/icons-material/Key";
import Logout from "@mui/icons-material/Logout";
import { profile } from "../../Assests/index";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import CustomModal from "../GeneralComponents/CustomModal";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { AuthContext } from "../../Context/AuthContext";
import { _logout } from "../../DAL/Admin";
import { useSnackbar } from "../../Context/SnackbarContext";

export default function ProfileIcon() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const open = Boolean(anchorEl);
  const { logout } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileUpdate = () => {
    navigate("/update-profile");
  };

  const handleSignOut = async () => {
    // _logout().then((res) => {
    //   console.log(res);
    //   logout();
    //   navigate("/");
    // });
    try {
      const res = await _logout();
      console.log(res);
      if (res.code === 200) {
        showSnackbar("Logout successful", "success");
        logout();
        navigate("/");
      }
    } catch (error) {
      showSnackbar("An error occurred. Please try again.", "error");
    }
  };

  return (
    <>
      <div className="profile-icon">
        <Tooltip title="Account settings">
          <div
            onClick={handleClick}
            className="profile-icon-button"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 40, height: 40, cursor: "pointer" }}
              src={profile}
            >
              A
            </Avatar>
          </div>
        </Tooltip>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            fontWeight: "600",
            "&:hover": { backgroundColor: "transparent" },
            "&:focus": { backgroundColor: "transparent" },
          }}
        >
          Ahlyab
        </MenuItem>

        <MenuItem
          onClick={handleClose}
          sx={{
            fontStyle: "italic",
            fontWeight: "200",
            color: "#a3a3a3",
            marginTop: "-16px",
            fontSize: "14px",
            "&:hover": { backgroundColor: "transparent" },
          }}
        >
          Ahlyabasad@gmail.com
        </MenuItem>
        <Divider className="divider" />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" color="primary" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleProfileUpdate}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" color="primary" />
          </ListItemIcon>
          Update Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setShowChangePassword(true);
          }}
        >
          <ListItemIcon>
            <KeyIcon fontSize="small" color="primary" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <CustomModal
        open={showChangePassword}
        handleClose={handleCloseChangePassword}
        component={<ChangePassword handleClose={handleCloseChangePassword} />}
      />
    </>
  );
}
