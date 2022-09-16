import { Search } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
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
import React, { useState } from "react";
import AlertDialog from "../AlertDialog";
import Navbar from "../Navbar";

const Transporter = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertData, setAlertData] = useState({
    error: false,
    medicine: "para",
  });

  const [columns, setColumns] = useState([
    { title: "From", key: "from" },
    { title: "To", key: "to" },
    { title: "Date", key: "date" },
  ]);
  const [data, setData] = useState([
    {
      from: "Moshi Manufacturer",
      to: "Joshi Bhai",
      date: new Date().toLocaleDateString("en", { dateStyle: "medium" }),
    },
  ]);

  const handleSearch = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Navbar isLoggedIn={true} />
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Transporter Dashboard
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
        {error ? (
          <Typography>There was an error. Please try again!</Typography>
        ) : data.length > 0 ? (
          <>
            <Typography variant="h6">Orders</Typography>
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
                          <Typography>{d[c.key]}</Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <CircularProgress />
        )}
        <AlertDialog open={open} handleClose={handleClose} data={alertData} />
      </Container>
    </Box>
  );
};

export default Transporter;
