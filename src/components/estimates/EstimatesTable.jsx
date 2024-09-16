import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Box,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import { Edit, Save, TimelapseRounded } from "@mui/icons-material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import StatusBar from "../StatusBar";

const EstimatesTable = ({ estimatesData = [] }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ marginBottom: "16px" }}>
            <TableRow sx={{ borderBottom: "1px solid lightgrey" }}>
              <TableCell
                sx={{
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "800",
                  padding: "0 16px",
                  whiteSpace: "nowrap",
                  width: "auto",
                }}
              >
                VERSION
              </TableCell>

              <TableCell
                sx={{
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "800",
                  padding: "0 16px",
                  whiteSpace: "nowrap",
                  width: "auto",
                }}
              >
                PROJECT
              </TableCell>

              <TableCell
                sx={{
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "800",
                  padding: "0 16px",
                  whiteSpace: "nowrap",
                  width: "auto",
                }}
              >
                CLIENT
              </TableCell>

              <TableCell
                sx={{
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "800",
                  padding: "0 16px",
                  whiteSpace: "nowrap",
                  width: "auto",
                }}
              >
                CREATED DATE
              </TableCell>

              <TableCell
                sx={{
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "800",
                  padding: "0 16px",
                  whiteSpace: "nowrap",
                  width: "auto",
                }}
              >
                LAST MODIFIED
              </TableCell>

              <TableCell
                sx={{
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "800",
                  padding: "0 16px",
                  whiteSpace: "nowrap",
                  width: "auto",
                }}
                align="center"
              >
                Status
              </TableCell>

              <TableCell
                sx={{
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "800",
                  padding: "0 16px",
                  whiteSpace: "nowrap",
                  width: "auto",
                }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {estimatesData.map((row) => (
              <TableRow key={row.id}>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    width: "auto",
                    minWidth: "140px",
                  }}
                >
                  0000{row.id}
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    width: "auto",
                    minWidth: "140px",
                  }}
                >
                  {row.project}
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    width: "auto",
                    minWidth: "140px",
                  }}
                >
                  {row.client}
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    width: "auto",
                    minWidth: "140px",
                  }}
                >
                  {row.createdDate}
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    width: "auto",
                    minWidth: "140px",
                  }}
                >
                  {row.lastModified}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    whiteSpace: "nowrap",
                    width: "auto",
                    minWidth: "140px",
                  }}
                >
                  <StatusBar status={row.status.toLowerCase()} />
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                    width: "auto",
                    minWidth: "140px",
                  }}
                  align="center"
                >
                  <Box display={"flex"} justifyContent={"center"} gap={1}>
                    <Edit
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/edit-estimate/${row.id}`)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EstimatesTable;
