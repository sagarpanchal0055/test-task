import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Stack } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';

const StatsCard = ({ title, value, icon, trend, trendText, up = true }) => {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent={"space-between"} spacing={2}>
          <Box>
            <Typography fontSize={"16px"} color='#202224' variant="h6">{title}</Typography>
            <Typography fontSize={"28px"} fontWeight={700} color='#202224' variant="h4">{value}</Typography>
          </Box>
          <img src={icon} alt='icons' />
        </Stack>
        <Typography variant="body2" color="textSecondary" display={"flex"} alignItems={"center"} gap={2}>
          {up ? <TrendingUpRoundedIcon sx={{ color: "#00B69B" }} /> : <TrendingDownRoundedIcon sx={{ color: "red" }} />} <span style={{ color:"#00B69B" }}>{` ${Math.abs(trend)}%`}</span> {trendText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard; 