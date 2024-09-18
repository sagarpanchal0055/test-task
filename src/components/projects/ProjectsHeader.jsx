import React, { useState, useRef } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import DateFilterPopover from "../DateFilterPopover";
import CustomButton from "../Button";
import ColumnVisibilityPopover from "../ColumnVisibilityPopover";
import Popover from "../Popover";
import StatusPopover from "../StatusPopover";
import "react-datepicker/dist/react-datepicker.css";

const ProjectsHeader = ({
  selectedDates,
  setSelectedDates,
  setStatus,
  columnVisibility,
  handleToggleColumn,
  handleToggleStatues,
  selectedStatus,
  initialStatues,
  setSelectedStatus,
  handleDateChange,
  initialStatuses,
  setDates,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [anchorElDate, setAnchorElDate] = useState(null);
  const [anchorElColumns, setAnchorElColumns] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);

  const datePickerRef = useRef(null);

  const handlePopoverToggle = (anchor, setAnchor) => (event) =>
    setAnchor(anchor ? null : event.currentTarget);

  const handleCloseDate = () => {
    setDates(selectedDates.map((date) => format(date, "dd/MM/yyyy")).join("|"));
    setAnchorElDate(null);
  };

  const handleResetFilter = () => {
    setSelectedDates([]);
    setDates("");
    setStatus("");
    setSelectedStatus(initialStatues);
    setSelectedStatus(initialStatuses);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box sx={{ padding: "7px", border: "1px solid rgba(0, 0, 0, 0.23)" }}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>
        <Typography p={"15px"} sx={{ border: "1px solid rgba(0, 0, 0, 0.23)" }}>
          {t("Filter By")}
        </Typography>
        <Box
          onClick={handlePopoverToggle(anchorElDate, setAnchorElDate)}
          sx={{
            borderRadius: "0",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            padding: "15px",
            cursor: "pointer"
          }}
        >
          {selectedDates.length > 0
            ? selectedDates.map((date) => (
                <Typography fontWeight={"bold"} key={date.toString()}>
                  {format(date, "dd MMM yyyy")}
                </Typography>
              ))
            : t("Date")}
        </Box>
        <Popover
          id="simple-popover-Date"
          open={Boolean(anchorElDate)}
          anchorEl={anchorElDate}
          onClose={handleCloseDate}
        >
          <DateFilterPopover
            datePickerRef={datePickerRef}
            handleDateChange={handleDateChange}
            selectedDates={selectedDates}
            handleCloseDate={handleCloseDate}
          />
        </Popover>
        <Box
          onClick={handlePopoverToggle(anchorElColumns, setAnchorElColumns)}
          sx={{
            borderRadius: "0",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            padding: "15px",
            cursor: "pointer"
          }}
        >
          {t("Hide Columns")}
        </Box>
        <Popover
          id="simple-popover-columns"
          open={Boolean(anchorElColumns)}
          anchorEl={anchorElColumns}
          onClose={handlePopoverToggle(anchorElColumns, setAnchorElColumns)}
        >
          <ColumnVisibilityPopover
            columnVisibility={columnVisibility}
            handleToggleColumn={handleToggleColumn}
            setAnchorElColumns={setAnchorElColumns}
          />
        </Popover>
        <Box
          onClick={handlePopoverToggle(anchorElStatus, setAnchorElStatus)}
          sx={{
            borderRadius: "0",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            padding: "15px",
            cursor: "pointer"
          }}
        >
          {t("Status")}
        </Box>
        <Popover
          id="simple-popover-status"
          open={Boolean(anchorElStatus)}
          anchorEl={anchorElStatus}
          onClose={handlePopoverToggle(anchorElStatus, setAnchorElStatus)}
        >
          <StatusPopover
            selectedStatus={selectedStatus}
            handleToggleStatues={handleToggleStatues}
            setAnchorElStatus={setAnchorElStatus}
          />
        </Popover>
        <Button
          startIcon={<RestartAltIcon />}
          sx={{
            borderRadius: "0",
            padding: "14.5px",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            color: "red",
          }}
          onClick={handleResetFilter}
          variant="text"
        >
          {t("Reset Filter")}
        </Button>
      </Box>
      <Box>
        <CustomButton onClick={() => navigate("/projects/add-project")}>
          {t("Add Project")}
        </CustomButton>
      </Box>
    </Box>
  );
};

export default ProjectsHeader;
