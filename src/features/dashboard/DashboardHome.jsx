import React from "react";
import { Container, Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "./../../assets/IconordersD.png";
import AccountCircleIcon from "./../../assets/IconuserD.png";
import AttachMoneyIcon from "./../../assets/Iconsalesd.png";
import PendingActionsIcon from "./../../assets/totalPending.png";
import StatsCard from "../../components/dashboard/StatsCard";
import SalesChart from "../../components/dashboard/SalesChart";
import ProductTable from "../../components/dashboard/ProductTable";

const App = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: "Total User",
      value: "40,689",
      icon: AccountCircleIcon,
      trend: 8.5,
      trendText: "Up from yesterday",
    },
    {
      title: "Total Order",
      value: "10,293",
      icon: ShoppingCartIcon,
      trend: 1.3,
      trendText: "Up from past week",
    },
    {
      title: "Total Sales",
      value: "$89,000",
      icon: AttachMoneyIcon,
      trend: -4.3,
      trendText: "Down from yesterday",
      up: false,
    },
    {
      title: "Total Pending",
      value: "2040",
      icon: PendingActionsIcon,
      trend: 1.8,
      trendText: "Up from yesterday",
    },
  ];

  return (
    <Box m={4}>
      <Box mt={4}>
        <Typography variant="h4" fontWeight={700} color="#202224" mb={4}>
          {t("Dashboard")}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          {stats.map(({ title, value, icon, trend, trendText, up }, index) => (
            <StatsCard
              key={index}
              title={t(title)}
              value={value}
              icon={icon}
              trend={trend}
              trendText={t(trendText)}
              up={up}
            />
          ))}
        </Stack>
      </Box>
      <Stack direction="column" spacing={4} mt={4}>
        <SalesChart />
        <ProductTable />
      </Stack>
    </Box>
  );
};

export default App;
