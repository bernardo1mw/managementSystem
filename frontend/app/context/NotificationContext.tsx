"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Severity = "error" | "warning" | "info" | "success";

interface NotificationContextProps {
  showNotification: (message: string, severity: Severity) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Severity>("info");

  const showNotification = (message: string, severity: Severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
