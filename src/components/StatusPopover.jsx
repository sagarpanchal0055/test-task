import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "./Button";

const StatusPopover = ({
  selectedStatus,
  handleToggleStatues,
  setAnchorElStatus,
}) => {
  const { t } = useTranslation();

  return (
    <Box width={600} p={4}>
      <Typography fontWeight={700} fontSize={"18px"}>
        {t("Select Status")}
      </Typography>
      <Box
        my={2}
        display="flex"
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"space-around"}
        gap={2}
      >
        {Object.keys(selectedStatus).map((status) => (
          <Box
            width={160}
            height={"auto"}
            border={"1px solid lightgrey"}
            textAlign={"center"}
            borderRadius={15}
            textTransform={"uppercase"}
            p={1}
            bgcolor={selectedStatus[status] ? "#4880FF" : ""}
            color={selectedStatus[status] ? "white" : "secondary.text"}
            sx={{ cursor: "pointer" }}
            onClick={() => handleToggleStatues(status)}
            key={status}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Box>
        ))}
      </Box>
      <Typography fontSize={"14px"} fontWeight={400} color="#434343">
        {t("*You can choose multiple statuses")}
      </Typography>
      <Box textAlign={"center"} my={2} onClick={() => setAnchorElStatus(null)}>
        <CustomButton>{t("Apply Now")}</CustomButton>
      </Box>
    </Box>
  );
};

export default StatusPopover;
