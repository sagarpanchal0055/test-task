import { Box, Typography } from "@mui/material";
import React from "react";
import EstimateTableForm from "../../components/estimates/EstimateTableForm";
import { useTranslation } from 'react-i18next';

function AddEstimate() {
  const { t } = useTranslation();

  return (
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="secondary.text">
        {t('ADD_NEW_ESTIMATE')}
      </Typography>
      
      <EstimateTableForm />
    </Box>
  );
}

export default AddEstimate;
