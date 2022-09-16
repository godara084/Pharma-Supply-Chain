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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { Add } from "@mui/icons-material";

const Buy = ({ sx = {} }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    medicine: { value: "", title: "Medicine", type: "text" },
    quantity: { value: "", title: "Quantity", type: "number" },
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

  const handleChangeManf = (e) => {};

  return (
    <Box sx={{ ...sx }}>
      <Button endIcon={<Add />} onClick={handleOpen} variant="contained">
        Buy Medicines
      </Button>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <DialogTitle>Buy Medicines</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <FormControl>
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
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained">Buy Now</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Buy;
