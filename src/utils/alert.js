import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = () => {
    setNotify({
      ...notify,
      open: false,
    });
  };

  return (
    <Snackbar
      open={notify?.open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify?.type ?? "success"} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
