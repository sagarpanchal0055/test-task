import { Box, Typography } from '@mui/material';
import React from 'react'
import DatePicker from 'react-datepicker';
import CustomButton from './Button';
import { useTranslation } from 'react-i18next';

const DateFilterPopover = ({ datePickerRef, handleDateChange, selectedDates, handleCloseDate }) => {
  const { t } = useTranslation();
  
  return (
    <Box p={4}>
      <DatePicker
        ref={datePickerRef}
        selected={null}
        onChange={handleDateChange}
        highlightDates={selectedDates}
        dateFormat="dd MMM yyyy"
        open
        inline
        placeholderText={t("Date")}
      />
      <Typography fontSize={"14px"} fontWeight={400} color="#434343">
        {t("*You can choose multiple dates")}
      </Typography>
      <Box textAlign={"center"} my={2} onClick={handleCloseDate}>
        <CustomButton>{t("Apply Now")}</CustomButton>
      </Box>
    </Box>
  )
};

export default DateFilterPopover