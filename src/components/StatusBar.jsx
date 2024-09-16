import React from 'react';
import { Box } from '@mui/material';

const StatusBar = ({ status }) => {
  const statusMap = {
    completed: {
      label: "Completed",
      color: "#D4F6E0",
      textColor: "#1FC39E",
    },
    created: {
      label: "Created",
      color: "#D4F6E0",
      textColor: "#1FC39E",
    },
    processing: {
      label: "Processing",
      color: "#E9E1FF",
      textColor: "#6828F5",
    },
    rejected: {
      label: "Rejected",
      color: "#FFE3E3",
      textColor: "#FF4444",
    },
    "on hold": {
      label: "On Hold",
      color: "rgb(255 223 193)",
      textColor: "#FFA756",
    },
    "in transit": {
      label: "In Transit",
      color: "rgb(230 190 249)",
      textColor: "#BA29FF",
    },
  };

  const currentStatus = statusMap[status] || {};

  return (
    <Box
      p={"8px 16px"}
      borderRadius={"8px"}
      fontWeight={"bold"}
      fontSize={"14px"}
      textAlign={"center"}
      minWidth={"100px"}
      className="status-bar"
      style={{
        backgroundColor: currentStatus.color,
        color: currentStatus.textColor,
      }}
    >
      {currentStatus.label}
    </Box>
  );
};

export default StatusBar;
