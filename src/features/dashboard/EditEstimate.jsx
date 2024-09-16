import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditEstimateTableForm from "../../components/estimates/EditEstimateTableForm";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditEstimate() {
  const [currentRecord, setCurrentRecord] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}estimates/${params.id}`)
      .then(response => {
        setCurrentRecord(response.data)
      })
      .catch(e => {
        console.log("error", e);
      })
  }, [params]);
  
  return (  
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="#202224">Edit Estimate</Typography>
      
      <EditEstimateTableForm currentRecord={currentRecord} />
    </Box>
  );
}

export default EditEstimate;
