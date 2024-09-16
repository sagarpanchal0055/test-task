import { Box, Typography } from "@mui/material";
import React from "react";
import EditProjectForm from "../../components/projects/EditProjectForm";
import EstimateTableForm from "../../components/estimates/EstimateTableForm";

function AddEstimate() {
  
  return (
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="#202224">Add New Estimate</Typography>
      
      <EstimateTableForm />
    </Box>
  );
}

export default AddEstimate;
