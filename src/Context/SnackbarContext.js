// SnackbarProvider.js
import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

// Create a context to store Snackbar's state and functions
const SnackbarContext = createContext();

// Custom hook to access the SnackbarContext
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info", // 'success', 'error', 'warning', 'info'
  });

  // Function to show the snackbar
  const showSnackbar = (
    message,
    severity = "info",
    vertical = "top",
    horizontal = "right"
  ) => {
    setSnackbarState({ open: true, message, severity, vertical, horizontal });
  };

  // Function to hide the snackbar
  const hideSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={hideSnackbar}
        anchorOrigin={{
          vertical: snackbarState.vertical ? snackbarState.vertical : "top",
          horizontal: snackbarState.horizontal
            ? snackbarState.horizontal
            : "right",
        }}
      >
        <Alert onClose={hideSnackbar} severity={snackbarState.severity}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
