import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "./Button";

const ColumnVisibilityPopover = ({
  columnVisibility,
  handleToggleColumn,
  setAnchorElColumns,
}) => {
  const { t } = useTranslation();

  return (
    <Box width={600} p={4}>
      <Typography fontWeight={700} fontSize={"18px"}>
        {t("Select Columns")}
      </Typography>
      <Box
        my={2}
        display="flex"
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"space-around"}
        gap={2}
      >
        {Object.keys(columnVisibility).map((column) => (
          <Box
            width={160}
            height={"auto"}
            border={"1px solid lightgrey"}
            textAlign={"center"}
            borderRadius={15}
            textTransform={"uppercase"}
            p={1}
            bgcolor={columnVisibility[column] ? "#4880FF" : ""}
            color={columnVisibility[column] ? "white" : "secondary.text"}
            sx={{ cursor: "pointer" }}
            onClick={() => handleToggleColumn(column)}
            key={column}
          >
            {column.split("_").join(" ")}
          </Box>
        ))}
      </Box>
      <Typography fontSize={"14px"} fontWeight={400} color="#434343">
        {t("*You can choose multiple Columns to hide")}
      </Typography>
      <Box textAlign={"center"} my={2} onClick={() => setAnchorElColumns(null)}>
        <CustomButton>{t("Apply Now")}</CustomButton>
      </Box>
    </Box>
  );
};

export default ColumnVisibilityPopover;
