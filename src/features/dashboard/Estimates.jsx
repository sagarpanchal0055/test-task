import { Box, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectsHeader from "../../components/projects/ProjectsHeader";
import ProjectsTable from "../../components/projects/ProjectsTable";
import axios from "axios";
import { format } from "date-fns";
import CustomButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import EstimatesTable from "../../components/estimates/EstimatesTable";

function Estimates() {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const responseOfCount = await axios.get(`${import.meta.env.VITE_API_BASE_URL}estimates`);
        setCount(responseOfCount.data.length)
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}estimates`, {
          params: {
            _page: page + 1,
            _limit: rowsPerPage,
          }
        });
        setEstimates(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchEstimates();
  }, [page, rowsPerPage]);

  return (
    <Box p={"24px"}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={3}>
        <Typography fontSize={"32px"} fontWeight={700} color="#202224">Estimates</Typography>
        
        <CustomButton onClick={() => navigate("/add-estimate")}>
          Add Estimate
        </CustomButton>
      </Box>
      <EstimatesTable estimatesData={estimates} />

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

export default Estimates;
