import {
  IconButton,
  Tooltip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { Add } from "@mui/icons-material";

const AddMed = ({ sx = {} }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    id: { value: "", title: "S. No.", type: "text" },
    name: { value: "", title: "Name", type: "text" },
    man_date: {
      value: new Date().toISOString().split("T")[0],
      title: "Manufactured On",
      type: "date",
    },
    exp_date: {
      value: new Date().toISOString().split("T")[0],
      title: "Expire On",
      type: "date",
    },
    lot_no: { value: "", title: "Lot Number", type: "number" },
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setDetails((prev) => {
      const temp = prev[e.target.name];
      temp.value = e.target.value;
      return { ...prev, [e.target.name]: temp };
    });
  };

  return (
    <Box sx={{ ...sx }}>
      <Button endIcon={<Add />} onClick={handleOpen} variant="contained">
        Add Medicine
      </Button>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <DialogTitle>Add Medicine</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            {Object.keys(details).map((k) => (
              <TextField
                key={k}
                label={details[k].title}
                variant="standard"
                value={details[k].value}
                onChange={handleChange}
                name={k}
                type={details[k].type}
                sx={{
                  my: 1,
                  width: "100%",
                  minWidth: "300px",
                  maxWidth: "400px",
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddMed;
