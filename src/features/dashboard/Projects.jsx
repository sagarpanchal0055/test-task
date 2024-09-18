import { Box, TablePagination, Typography } from "@mui/material";
import React, { useState, useCallback } from "react";
import ProjectsHeader from "../../components/projects/ProjectsHeader";
import ProjectsTable from "../../components/projects/ProjectsTable";
import { useFetchProjects } from "../../hooks/useFetchProjects";
import { useTranslation } from "react-i18next";

const initialColumnVisibility = {
  customer: true,
  ref_Number: true,
  due_Date: true,
  contact: true,
  comments: true,
  status: true,
  area_Location: true,
};

const initialStatuses = {
  Completed: false,
  Processing: false,
  Rejected: false,
  "on Hold": false,
  "In Transit": false,
};

function Projects() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDates, setSelectedDates] = useState([]);
  const [dates, setDates] = useState("");
  const [columnVisibility, setColumnVisibility] = useState(
    initialColumnVisibility
  );
  const [selectedStatus, setSelectedStatus] = useState(initialStatuses);
  const [status, setStatus] = useState("");

  const { products, count, loading, error } = useFetchProjects(
    page,
    rowsPerPage,
    selectedStatus,
    dates
  );

  const handleDateChange = (date) => {
    if (date) {
      const exists = selectedDates.some(
        (selectedDate) => selectedDate.getTime() === date.getTime()
      );

      if (exists) {
        setSelectedDates(
          selectedDates.filter(
            (selectedDate) => selectedDate.getTime() !== date.getTime()
          )
        );
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    }
  };

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleToggleColumn = useCallback((column) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  }, []);

  const handleToggleStatuses = useCallback((status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  }, []);

  return (
    <Box p="24px">
      <Typography fontSize="32px" fontWeight={700} color="secondary.text">
        {t("Projects")}
      </Typography>
      <Box mb={3}>
        <ProjectsHeader
          handleToggleColumn={handleToggleColumn}
          initialColumnVisibility={initialColumnVisibility}
          columnVisibility={columnVisibility}
          handleDateChange={handleDateChange}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          status={status}
          setStatus={setStatus}
          initialStatues={selectedStatus}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          handleToggleStatues={handleToggleStatuses}
          setDates={setDates}
          initialStatuses={initialStatuses}
        />
      </Box>

      <ProjectsTable
        columnVisibility={columnVisibility}
        projectData={products}
      />

      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default Projects;
