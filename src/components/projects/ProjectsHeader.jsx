import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CustomButton from "../Button";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const ProjectsHeader = ({
  selectedDates,
  setSelectedDates,
  setStatus,
  initialColumnVisibility,
  columnVisibility,
  handleToggleColumn,
  handleToggleStatues,
  selectedStatus,
  initialStatues,
  setSelectedStatus,
  handleDateChange,
  setDates
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [anchorElDate, setAnchorElDate] = useState(null);
  const handleClickDate = (event) => {
    setAnchorElDate(anchorElDate ? null : event.currentTarget);
  };
  const handleCloseDate = () => {
    setDates(selectedDates.map(date => {
      return format(date, 'dd/MM/yyyy')
    }).join("|"))
    setAnchorElDate(null);
  };
  const openDate = Boolean(anchorElDate);
  const idDate = openDate ? "simple-popover-Date" : undefined;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const handleClickStatus = (event) => {
    setAnchorElStatus(anchorElStatus ? null : event.currentTarget);
  };
  const handleCloseStatus = () => {
    setAnchorElStatus(null);
  };
  const openStatus = Boolean(anchorElStatus);
  const idStatus = openStatus ? "simple-popover-2" : undefined;

  const datePickerRef = React.useRef(null);

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
          onClick={handleClickDate}
          sx={{
            borderRadius: "0",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            padding: "15px",
          }}
        >
          {selectedDates.length > 0 ? selectedDates.map(date => {
            return <Typography fontWeight={"bold"}>{format(date, "dd MMM yyyy")}</Typography>
          }) : t("Date")}
        </Box>
        <Popover
          id={idDate}
          open={openDate}
          anchorEl={anchorElDate}
          onClose={handleCloseDate}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box p={4}>
            <DatePicker
              ref={datePickerRef}
              selected={null}
              onChange={handleDateChange}
              highlightDates={selectedDates}
              dateFormat="dd MMM yyyy"
              open
              inline
              placeholderText={t("Date")}
            />

            <Typography fontSize={"14px"} fontWeight={400} color="#434343">
              {t("*You can choose multiple date")}
            </Typography>

            <Box textAlign={"center"} my={2} onClick={handleCloseDate}>
              <CustomButton>{t("Apply Now")}</CustomButton>
            </Box>
          </Box>
        </Popover>

        <Box
          onClick={handleClick}
          sx={{
            borderRadius: "0",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            padding: "15px",
          }}
        >
          {t("Hide Columns")}
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box width={600} p={4}>
            <Typography fontWeight={700} fontSize={"18px"}>
              {t("Select Columns")}
            </Typography>

            <Box
              my={2}
              display="flex"
              flexWrap={"wrap"}
              alignItems={"center"}
              justifyContent={"space-around"}
              gap={2}
            >
              {Object.keys(initialColumnVisibility).map((column) => (
                <Box
                  width={160}
                  height={"auto"}
                  border={"1px solid lightgrey"}
                  textAlign={"center"}
                  borderRadius={15}
                  textTransform={"uppercase"}
                  p={1}
                  bgcolor={columnVisibility[column] ? "#4880FF" : ""}
                  color={columnVisibility[column] ? "white" : "black"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleToggleColumn(column)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </Box>
              ))}
            </Box>

            <Typography fontSize={"14px"} fontWeight={400} color="#434343">
              {t("*You can choose multiple Columns to hide")}
            </Typography>

            <Box textAlign={"center"} my={2} onClick={handleClose}>
              <CustomButton>{t("Apply Now")}</CustomButton>
            </Box>
          </Box>
        </Popover>

        <Box
          onClick={handleClickStatus}
          sx={{
            borderRadius: "0",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            padding: "15px",
          }}
        >
          {t("Status")}
        </Box>
        <Popover
          id={idStatus}
          open={openStatus}
          anchorEl={anchorElStatus}
          onClose={handleCloseStatus}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box width={600} p={4}>
            <Typography fontWeight={700} fontSize={"18px"}>
              {t("Select Status")}
            </Typography>

            <Box
              my={2}
              display="flex"
              flexWrap={"wrap"}
              alignItems={"center"}
              justifyContent={"space-around"}
              gap={2}
            >
              {Object.keys(initialStatues).map((column) => (
                <Box
                  width={160}
                  height={"auto"}
                  border={"1px solid lightgrey"}
                  textAlign={"center"}
                  borderRadius={15}
                  textTransform={"uppercase"}
                  p={1}
                  bgcolor={selectedStatus[column] ? "#4880FF" : ""}
                  color={selectedStatus[column] ? "white" : "black"}
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleToggleStatues(column)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </Box>
              ))}
            </Box>

            <Typography fontSize={"14px"} fontWeight={400} color="#434343">
              {t("*You can choose multiple status")}
            </Typography>

            <Box textAlign={"center"} my={2} onClick={handleCloseStatus}>
              <CustomButton>{t("Apply Now")}</CustomButton>
            </Box>
          </Box>
        </Popover>

        <Button
          startIcon={<RestartAltIcon />}
          sx={{
            borderRadius: "0",
            padding: "14.5px",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            color: "red"
          }}
          onClick={() => {
            setSelectedDates([]);
            setDates("")
            setStatus("");
            setSelectedStatus(initialStatues)
          }}
          variant="text"
        >
          {t("Reset Filter")}
        </Button>
      </Box>

      <Box>
        <CustomButton onClick={() => navigate("/add-project")}>
          {t("Add Project")}
        </CustomButton>
      </Box>
    </Box>
  );
};

export default ProjectsHeader;
