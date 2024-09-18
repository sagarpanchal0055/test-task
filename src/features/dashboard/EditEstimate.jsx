import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import EstimateTableForm from "../../components/estimates/EstimateTableForm";

function EditEstimate() {
  const { t } = useTranslation();
  const [currentRecord, setCurrentRecord] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}estimates/${params.id}`)
      .then(response => {
        setCurrentRecord(response.data);
      })
      .catch(e => {
        console.log("error", e);
      });
  }, [params]);

  return (  
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="secondary.text">
        {t('Edit Estimate')}
      </Typography>
      
      <EstimateTableForm isEditing={true} currentRecord={currentRecord} />
    </Box>
  );
}

export default EditEstimate;
