'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlertSetting } from '../../types/currency';
import { currencyInfo } from '../../utils/currencyData';

interface Props {
  currencies: string[];
  onAddAlert: (alert: AlertSetting) => void;
  alerts: AlertSetting[];
  onDeleteAlert: (index: number) => void;
}

export default function RateAlert({ currencies, onAddAlert, alerts, onDeleteAlert }: Props) {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [targetRate, setTargetRate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCurrency || !toCurrency || !targetRate) return;

    onAddAlert({
      fromCurrency,
      toCurrency,
      targetRate: parseFloat(targetRate)
    });

    // Reset form
    setFromCurrency('');
    setToCurrency('');
    setTargetRate('');
  };

  const renderCurrencyOption = (currency: string) => {
    const info = currencyInfo[currency] || {
      code: currency,
      name: currency,
      symbol: currency,
      flag: '🏳️'
    };
    return (
      <MenuItem key={currency} value={currency}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{info.flag}</span>
          <span>{currency}</span>
          <span style={{ color: 'text.secondary', marginRight: 'auto' }}>
            {info.name}
          </span>
        </Box>
      </MenuItem>
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        تنظیم هشدار نرخ ارز
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          select
          label="از ارز"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          sx={{ mb: 2 }}
        >
          {currencies.map(renderCurrencyOption)}
        </TextField>
        <TextField
          fullWidth
          select
          label="به ارز"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          sx={{ mb: 2 }}
        >
          {currencies.map(renderCurrencyOption)}
        </TextField>
        <TextField
          fullWidth
          type="number"
          label="نرخ هدف"
          value={targetRate}
          onChange={(e) => setTargetRate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!fromCurrency || !toCurrency || !targetRate}
        >
          افزودن هشدار
        </Button>
      </Box>

      {alerts.length > 0 && (
        <List sx={{ mt: 2 }}>
          {alerts.map((alert, index) => {
            const fromInfo = currencyInfo[alert.fromCurrency] || {
              code: alert.fromCurrency,
              name: alert.fromCurrency,
              symbol: alert.fromCurrency,
              flag: '🏳️'
            };
            const toInfo = currencyInfo[alert.toCurrency] || {
              code: alert.toCurrency,
              name: alert.toCurrency,
              symbol: alert.toCurrency,
              flag: '🏳️'
            };
            return (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => onDeleteAlert(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'transparent' }}>
                    {fromInfo.flag}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{fromInfo.name}</span>
                      <span>به</span>
                      <span>{toInfo.name}</span>
                      <span>{toInfo.flag}</span>
                    </Box>
                  }
                  secondary={`نرخ هدف: ${alert.targetRate}`}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
} 