import { Box, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectsHeader from "../../components/projects/ProjectsHeader";
import ProjectsTable from "../../components/projects/ProjectsTable";
import axios from "axios";
import { useTranslation } from "react-i18next";

const initialColumnVisibility = {
  customer: true,
  refNumber: true,
  dueDate: true,
  contact: true,
  comments: true,
  status: true,
  areaLocation: true,
};

const initialStatues = {
  completed: false,
  processing: false,
  rejected: false,
  onHold: false,
  inTransit: false,
};

function Projects() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const [status, setStatus] = useState("");
  const [dates, setDates] = useState("");
  const [count, setCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleDateChange = (date) => {
    if (date) {
      const exists = selectedDates.some(
        (selectedDate) => selectedDate.getTime() === date.getTime()
      );

      if (exists) {
        setSelectedDates(selectedDates.filter(
          (selectedDate) => selectedDate.getTime() !== date.getTime()
        ));
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [columnVisibility, setColumnVisibility] = useState(initialColumnVisibility);
  const [selectedStatus, setSelectedStatus] = useState(initialStatues);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseOfCount = await axios.get(`${import.meta.env.VITE_API_BASE_URL}projects`, {
          params: {
            status_like: Object.keys(selectedStatus)
            .filter(key => selectedStatus[key])
            .join('|'),
            dueDate_like: dates ? dates : null
          }
        });
        setCount(responseOfCount.data.length)
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}projects`, {
          params: {
            _page: page + 1,
            _limit: rowsPerPage,
            status_like: Object.keys(selectedStatus)
            .filter(key => selectedStatus[key])
            .join('|'),
            dueDate_like: dates ? dates : null
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage, selectedStatus, dates]);

  const handleToggleColumn = (column) => {
    setColumnVisibility({
      ...columnVisibility,
      [column]: !columnVisibility[column],
    });
  };

  const handleToggleStatues = (column) => {
    setSelectedStatus({
      ...selectedStatus,
      [column]: !selectedStatus[column],
    });
  };

  return (
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="#202224">{t("Projects")}</Typography>
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
          initialStatues={initialStatues}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          handleToggleStatues={handleToggleStatues}
          setDates={setDates}
        />
      </Box>
      <ProjectsTable columnVisibility={columnVisibility} projectData={products} />

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
