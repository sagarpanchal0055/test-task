import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ProjectForm from "../../components/projects/ProjectForm";

function EditProject() {
  const { t } = useTranslation();
  const [currentRecord, setCurrentRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}projects/${params.id}`)
      .then((response) => {
        setCurrentRecord(response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error", e);
        setError(t("fetchError"));
        setLoading(false);
      });
  }, [params.id, t]);

  if (loading) {
    return (
      <Box
        p={"24px"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={"24px"}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="secondary.text">
        {t("editProject")}
      </Typography>

      {currentRecord && <ProjectForm isEditing={true} currentRecord={currentRecord} />}
    </Box>
  );
}

export default EditProject;
