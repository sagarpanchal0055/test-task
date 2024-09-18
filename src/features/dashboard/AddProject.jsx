import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import ProjectForm from "../../components/projects/ProjectForm";

function AddProject() {
  const { t } = useTranslation();

  return (
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="secondary.text">
        {t("Add New Project")}
      </Typography>
      
      <ProjectForm />
    </Box>
  );
}

export default AddProject;
