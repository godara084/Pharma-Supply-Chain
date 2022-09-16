import { Check, Search } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import AlertDialog from "../AlertDialog";
import Buy from "./Buy";

const Customer = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    error: false,
    medicine: "para",
  });
  const [columns, setColumns] = useState([
    { title: "Medicine", key: "medicine" },
    { title: "Quantity", key: "quantity" },
  ]);
  const [data, setData] = useState([
    {
      medicine: "Paracetamol",
      quantity: 10,
    },
  ]);

  const handleFulfil = () => {};

  const handleSearch = () => {
    console.log("search");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Navbar isLoggedIn={true} />
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Customer Dashboard
        </Typography>
        <Box display="flex" width="100%" alignItems={"flex-end"} sx={{ mb: 5 }}>
          <TextField
            variant="standard"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search with lot number"
            sx={{ width: "100%", maxWidth: 400 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <Box>
            <Tooltip title="Search">
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Buy sx={{ mb: 5 }} />
        <Typography variant="h6">My Orders</Typography>
        <Table>
          <TableHead>
            <TableRow
              sx={(theme) => ({
                background: theme.palette.primary.main,
                position: "sticky",
                top: 0,
              })}
            >
              {columns.map((c) => (
                <TableCell
                  key={c.key}
                  sx={(theme) => ({
                    color: theme.palette.primary.contrastText,
                    border: 1,
                    width: 100,
                  })}
                  align="center"
                >
                  {c.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, idx) => (
              <TableRow key={idx}>
                {columns.map((c) => {
                  return (
                    <TableCell
                      key={c.key}
                      align="center"
                      sx={(theme) => ({
                        border: 1,
                        borderColor: theme.palette.divider,
                      })}
                    >
                      {c.key === "fulfilled" ? (
                        <Tooltip title="Mark as completed">
                          <Checkbox
                            checked={d[c.key] === 1}
                            onChange={handleFulfil}
                          />
                        </Tooltip>
                      ) : (
                        <Typography>{d[c.key]}</Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AlertDialog open={open} handleClose={handleClose} data={alertData} />
      </Container>
    </Box>
  );
};

export default Customer;
