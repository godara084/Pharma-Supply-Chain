import { Check } from "@mui/icons-material";
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
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import AddMed from "./AddMed";

const Manufacturer = () => {
  const [columns, setColumns] = useState([
    { title: "Retailer", key: "retailer" },
    { title: "Medicine", key: "medicine" },
    { title: "Quantity", key: "quantity" },
    { title: "Fulfilled", key: "fulfilled" },
  ]);
  const [data, setData] = useState([
    {
      retailer: "Joshi Bhai",
      medicine: "Paracetamol",
      quantity: 10,
      fulfilled: Math.round(Math.random()),
    },
  ]);

  const handleFulfil = () => {};

  return (
    <Box>
      <Navbar isLoggedIn={true} />
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Manufacturer Dashboard
        </Typography>
        <AddMed sx={{ mb: 5 }} />
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
      </Container>
    </Box>
  );
};

export default Manufacturer;
