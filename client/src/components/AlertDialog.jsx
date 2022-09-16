import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  Typography,
} from "@mui/material";
import React from "react";

const AlertDialog = ({ open, handleClose, data }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Validity Check</DialogTitle>
      <DialogContent>
        {data.error ? (
          <Typography color="error">Medicine Not Authentic</Typography>
        ) : (
          <Box>
            {Object.keys(data).map((k) => {
              if (k !== "error") {
                return (
                  <Box key={k} display="flex">
                    <InputLabel sx={{ marginRight: "auto" }}>{k}</InputLabel>
                    <Typography sx={{ marginLeft: "auto" }}>
                      {data[k]}
                    </Typography>
                  </Box>
                );
              }
            })}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
