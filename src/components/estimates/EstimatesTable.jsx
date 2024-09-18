import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import StatusBar from "../StatusBar";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const EstimatesTable = ({ estimatesData = [] }) => {
  const { t } = useTranslation(); // Use translation hook
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
                {t('VERSION')}
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
                {t('PROJECT')}
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
                {t('CLIENT')}
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
                {t('CREATED_DATE')}
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
                {t('LAST_MODIFIED')}
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
                {t('STATUS')}
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
                {t('ACTION')}
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
                      onClick={() => navigate(`/estimates/edit-estimate/${row.id}`)}
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
