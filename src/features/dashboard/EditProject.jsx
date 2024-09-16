import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UpdatedProjectForm from "../../components/projects/UpdatedProjectForm";

function EditProject() {
  const [currentRecord, setCurrentRecord] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}projects/${params.id}`)
      .then(response => {
        setCurrentRecord(response.data)
      })
      .catch(e => {
        console.log("error", e);
      })
  }, [params])

  return (
    <Box p={"24px"}>
      <Typography fontSize={"32px"} fontWeight={700} color="#202224">Edit Project</Typography>
      
      <UpdatedProjectForm currentRecord={currentRecord} />
    </Box>
  );
}

export default EditProject;
