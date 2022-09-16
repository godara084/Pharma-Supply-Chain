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

const AddOrder = ({ sx = {} }) => {
  const [open, setOpen] = useState(false);
  const [manfOptions, setManfOptions] = useState([
    "Ramesh Bhai",
    "Suresh Bhai",
    "Brijesh Bhai",
  ]);
  const [manf, setManf] = useState(manfOptions[0]);
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

  const handleChangeManf = (e) => {
    setManf(e.target.value);
  };

  return (
    <Box sx={{ ...sx }}>
      <Button endIcon={<Add />} onClick={handleOpen} variant="contained">
        Order Medicines
      </Button>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <DialogTitle>Order Medicines</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <FormControl>
              <InputLabel id="manf-select-label" sx={{ mt: 1 }}>
                Manufacturer
              </InputLabel>
              <Select
                labelId="manf-select-label"
                id="manf-select"
                label="Manufacturer"
                value={manf}
                onChange={handleChangeManf}
                sx={{ mt: 1 }}
              >
                {manfOptions.map((m, idx) => (
                  <MenuItem key={idx} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
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
          <Button variant="contained">Place Order</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddOrder;
