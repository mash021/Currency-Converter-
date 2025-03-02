'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Typography,
  Tooltip
} from '@mui/material';
import { CurrencyRate } from '../../types/currency';
import { currencyInfo } from '../../utils/currencyData';

interface Props {
  currencyData: CurrencyRate;
}

export default function CurrencyRates({ currencyData }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRates = Object.entries(currencyData.rates).filter(
    ([currency]) =>
      currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (currencyInfo[currency]?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        نرخ‌های ارز
      </Typography>
      <TextField
        fullWidth
        label="جستجوی ارز"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>پرچم</TableCell>
              <TableCell>ارز</TableCell>
              <TableCell>نام</TableCell>
              <TableCell align="right">نرخ (نسبت به {currencyData.base})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRates.map(([currency, rate]) => {
              const info = currencyInfo[currency] || {
                code: currency,
                name: currency,
                symbol: currency,
                flag: '🏳️'
              };
              return (
                <TableRow key={currency}>
                  <TableCell>{info.flag}</TableCell>
                  <TableCell>
                    <Tooltip title={`${info.symbol} - ${currency}`}>
                      <span>{currency}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{info.name}</TableCell>
                  <TableCell align="right">{rate.toFixed(4)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
        آخرین به‌روزرسانی: {new Date(currencyData.timestamp * 1000).toLocaleString()}
      </Typography>
    </Box>
  );
} 