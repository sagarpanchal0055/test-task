import { Box, Typography } from "@mui/material";
import React from "react";
import EditProjectForm from "../../components/projects/EditProjectForm";
import { useTranslation } from "react-i18next";

function AddProject() {
  const { t } = useTranslation();

  return (
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="#202224">
        {t("Add New Project")}
      </Typography>
      
      <EditProjectForm />
    </Box>
  );
}

export default AddProject;
