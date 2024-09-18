import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Avatar,
} from "@mui/material";
import { Edit, Save, TimelapseRounded } from "@mui/icons-material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StatusBar from "../StatusBar";

const ProjectsTable = ({ columnVisibility, projectData = [] }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columnVisibility.customer && (
                <TableCell
                  sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                  rowSpan={2}
                  align="left"
                >
                  {t("Customer")}
                </TableCell>
              )}
              {columnVisibility.refNumber && (
                <TableCell
                  sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                  rowSpan={2}
                  align="center"
                >
                  {t("Ref Number")}
                </TableCell>
              )}

              <TableCell
                sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                colSpan={2}
                align="center"
              >
                {t("Project Reference")}
                <TableCell
                  sx={{ border: "none", minWidth: "140px", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                  align="right"
                >
                  {t("Project Name")}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ border: "none", minWidth: "140px", fontSize: "14px", fontWeight: "800", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                >
                  {t("Project Number")}
                </TableCell>
              </TableCell>
              {columnVisibility.areaLocation && (
                <TableCell
                  sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                  colSpan={2}
                  align="center"
                >
                  {t("Project Location")}
                  {columnVisibility.areaLocation && (
                    <TableCell
                      sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", minWidth: "140px", width: "auto" }}
                      align="right"
                    >
                      {t("Area Location")}
                    </TableCell>
                  )}
                  {columnVisibility.areaLocation && (
                    <TableCell
                      sx={{ border: "none", fontSize: "14px", fontWeight: "800", padding: "0 16px", whiteSpace: "nowrap", minWidth: "140px", width: "auto" }}
                      align="left"
                    >
                      {t("Address")}
                    </TableCell>
                  )}
                </TableCell>
              )}
              {columnVisibility.dueDate && (
                <TableCell
                  sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                  align="center"
                >
                  {t("Due Date")}
                </TableCell>
              )}
              {columnVisibility.contact && (
                <TableCell
                  sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                  align="center"
                >
                  {t("Contact")}
                </TableCell>
              )}

              <TableCell
                sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                colSpan={2}
                align="center"
              >
                {t("Assigned To")}
                <TableCell
                  sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}
                  align="right"
                >
                  {t("Manager")}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ border: "none", fontSize: "14px", minWidth: "140px", fontWeight: "800", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                >
                  {t("Staff")}
                </TableCell>
              </TableCell>
              {columnVisibility.status && (
                <TableCell
                  sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                  align="center"
                >
                  {t("Status")}
                </TableCell>
              )}
              <TableCell
                sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                align="center"
              >
                {t("Action")}
              </TableCell>

              {columnVisibility.comments && (
                <TableCell
                  sx={{ border: "none", fontSize: "14px", fontWeight: "800", borderRight: "1px solid lightgrey", padding: "0 16px", whiteSpace: "nowrap", width: "auto" }}
                  align="center"
                >
                  {t("Comments")}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {projectData.map((row) => (
              <TableRow key={row.id}>
                {columnVisibility.customer && (
                  <TableCell sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                    {row.customer}
                  </TableCell>
                )}
                {columnVisibility.refNumber && (
                  <TableCell align="center" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                    {row.refNumber}
                  </TableCell>
                )}

                <TableCell align="right" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                  {row.projectName}
                </TableCell>
                <TableCell align="left" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                  {row.projectNumber}
                </TableCell>
                {columnVisibility.areaLocation && (
                  <TableCell align="right" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                    {row.areaLocation}
                  </TableCell>
                )}
                {columnVisibility.areaLocation && (
                  <TableCell sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                    {row.address}
                  </TableCell>
                )}
                {columnVisibility.dueDate && (
                  <TableCell align="center" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                    {row.dueDate}
                  </TableCell>
                )}
                {columnVisibility.contact && (
                  <TableCell align="center" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                    {row.contact}
                  </TableCell>
                )}
                <TableCell align="right" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                  {row.manager}
                </TableCell>
                <TableCell align="left" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                  {row.staff}
                </TableCell>
                {columnVisibility.status && (
                  <TableCell align="center" sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                    <StatusBar status={row.status.toLowerCase()} />
                  </TableCell>
                )}
                <TableCell sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }} align="center">
                  <Box display={"flex"} gap={1}>
                    <Edit sx={{ cursor: "pointer" }} onClick={() => navigate(`/projects/edit-project/${row.id}`)} />
                    <Save sx={{ cursor: "pointer" }} />
                    <TimelapseRounded sx={{ cursor: "pointer" }} />
                  </Box>
                </TableCell>
                {columnVisibility.comments && (
                  <TableCell sx={{ whiteSpace: "nowrap", width: "auto", minWidth: "140px" }}>
                    <Box display={"flex"} gap={1}>
                      <Avatar>{t("+1")}</Avatar>
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>{t("+1")}</Avatar>
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>{t("+1")}</Avatar>
                      <Avatar>{t("+1")}</Avatar>
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectsTable;
