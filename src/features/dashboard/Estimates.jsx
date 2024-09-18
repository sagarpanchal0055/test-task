import { Box, CircularProgress, TablePagination, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../components/Button";
import { useNavigate } from "react-router-dom";
import EstimatesTable from "../../components/estimates/EstimatesTable";
import useFetchEstimates from "../../hooks/useFetchEstimates";
import FullScreenLoader from "../../components/FullScreenLoader";

function Estimates() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { estimates, count, loading, error } = useFetchEstimates(page, rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <Typography>{t("Error fetching estimates.")}</Typography>;
  }

  return (
    <Box p={"24px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={3}
      >
        <Typography fontSize={"32px"} fontWeight={700} color="secondary.text">
          {t("Estimates")}
        </Typography>

        <CustomButton onClick={() => navigate("/estimates/add-estimate")}>
          {t("Add Estimate")}
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
        labelRowsPerPage={t("Rows per page")}
        labelDisplayedRows={({ from, to, count }) =>
          t("Showing {{from}} to {{to}} of {{count}}", { from, to, count })
        }
      />
    </Box>
  );
}

export default Estimates;
