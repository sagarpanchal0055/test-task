import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Box } from '@mui/material';

const ProductTable = () => {
  const rows = [
    {
      productName: 'Apple Watch',
      location: '6096 Marjolaine Landing',
      date: '12.09.2019 - 12:53 PM',
      piece: 423,
      amount: '$34,295',
      status: 'Delivered',
    },
    {
      productName: 'Apple Watch',
      location: '6096 Marjolaine Landing',
      date: '12.09.2019 - 12:53 PM',
      piece: 423,
      amount: '$34,295',
      status: 'Delivered',
    },
    {
      productName: 'Apple Watch',
      location: '6096 Marjolaine Landing',
      date: '12.09.2019 - 12:53 PM',
      piece: 423,
      amount: '$34,295',
      status: 'Delivered',
    },
    {
      productName: 'Apple Watch',
      location: '6096 Marjolaine Landing',
      date: '12.09.2019 - 12:53 PM',
      piece: 423,
      amount: '$34,295',
      status: 'Delivered',
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Date - Time</TableCell>
            <TableCell>Piece</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar alt={row.productName} src="/apple-watch.jpg" />
                {row.productName}
              </TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.piece}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                <Box sx={{ background: '#00B69B', color: "white", p: "8px 4px", borderRadius: "16px", textAlign: "center" }}>{row.status}</Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
