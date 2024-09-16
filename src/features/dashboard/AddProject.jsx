import { Box, Typography } from "@mui/material";
import React from "react";
import EditProjectForm from "../../components/projects/EditProjectForm";

function AddProject() {
  
  return (
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="#202224">Add New Project</Typography>
      
      <EditProjectForm />
    </Box>
  );
}

export default AddProject;
