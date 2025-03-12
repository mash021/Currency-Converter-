'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  Box,
  Autocomplete,
  TextField,
  Chip
} from '@mui/material';
import { CurrencyRate } from '../../types/currency';
import { currencyInfo } from '../../utils/currencyData';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

interface Props {
  currencyData: CurrencyRate;
}

export default function CurrencyRates({ currencyData }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const currencies = Object.entries(currencyData.rates).map(([currency]) => ({
    code: currency,
    name: currencyInfo[currency]?.name || currency,
    symbol: currencyInfo[currency]?.symbol || currency
  }));

  const filteredRates = Object.entries(currencyData.rates).filter(
    ([currency]) =>
      currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (currencyInfo[currency]?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRateStatus = (rate: number) => {
    if (rate > 1) {
      return {
        color: 'success',
        icon: <TrendingUpIcon />,
        label: 'سودآور'
      };
    }
    else if (rate === 1) {
      return {
        color: 'warning',
        icon: <TrendingFlatIcon />,
        label: 'بدون تغییر'
      };
    }
    else {
      return {
        color: 'error',
        icon: <TrendingDownIcon />,
        label: 'ضررده'
      };
    }
  };

  return (
    <div className="space-y-6">
      <Typography variant="h5" className="text-light font-bold">
        نرخ‌های ارز
      </Typography>

      <div className="relative">
        <TextField
          fullWidth
          placeholder="جستجوی ارز"
          className="input-dark"
          InputProps={{
            className: 'text-light pr-10',
            startAdornment: (
              <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent/50" />
            ),
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="table-header">نماد</TableCell>
                <TableCell className="table-header">ارز</TableCell>
                <TableCell className="table-header">نام</TableCell>
                <TableCell className="table-header" align="right">
                  نرخ (نسبت به {currencyData.base})
                </TableCell>
                <TableCell className="table-header" align="center">
                  وضعیت
                </TableCell>
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
                const status = getRateStatus(rate);
                return (
                  <TableRow 
                    key={currency}
                    className="table-row"
                  >
                    <TableCell className="table-cell">
                      <span className="text-2xl">{info.flag}</span>
                    </TableCell>
                    <TableCell className="table-cell">
                      <Tooltip title={`${info.symbol} - ${currency}`}>
                        <span className="font-medium">{currency}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="table-cell text-light/70">{info.name}</TableCell>
                    <TableCell className="table-cell font-medium" align="right">
                      {rate.toFixed(4)}
                    </TableCell>
                    <TableCell className="table-cell" align="center">
                      <Chip
                        icon={status.icon}
                        label={status.label}
                        color={status.color as any}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Typography variant="caption" className="text-accent/70 block text-sm">
        آخرین به‌روزرسانی: {new Date(currencyData.timestamp * 1000).toLocaleString('fa-IR')}
      </Typography>
    </div>
  );
} 