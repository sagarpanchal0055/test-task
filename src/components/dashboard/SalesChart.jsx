import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const { t } = useTranslation();

  const data = useMemo(() => ({
    labels: ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k'],
    datasets: [
      {
        label: t('Sales'),
        data: [20, 40, 60, 80, 50, 70, 60, 40, 50, 30, 50, 60],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  }), [t]);

  const options = useMemo(() => ({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }), []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{t('Sales Details')}</Typography>
        <Box mt={2}>
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
