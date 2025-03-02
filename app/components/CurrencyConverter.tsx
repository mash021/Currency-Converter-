'use client';

import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import { ConversionResult } from '../../types/currency';
import { currencyInfo } from '../../utils/currencyData';

interface Props {
  rates: { [key: string]: number };
  baseCurrency: string;
}

export default function CurrencyConverter({ rates, baseCurrency }: Props) {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>(baseCurrency);
  const [toCurrency, setToCurrency] = useState<string>('');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const currencies = [baseCurrency, ...Object.keys(rates)];

  const handleConvert = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;

    let rate: number;
    if (fromCurrency === baseCurrency) {
      rate = rates[toCurrency];
    } else if (toCurrency === baseCurrency) {
      rate = 1 / rates[fromCurrency];
    } else {
      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];
      rate = toRate / fromRate;
    }

    const convertedAmount = numAmount * rate;
    setResult({
      amount: numAmount,
      from: fromCurrency,
      to: toCurrency,
      result: convertedAmount,
      rate
    });
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
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        تبدیل ارز
      </Typography>
      <TextField
        fullWidth
        label="مقدار"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mb: 2 }}
      />
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
      <Button
        fullWidth
        variant="contained"
        onClick={handleConvert}
        disabled={!amount || !fromCurrency || !toCurrency}
      >
        تبدیل
      </Button>

      {result && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="body1">
            {result.amount} {currencyInfo[result.from]?.symbol || result.from} = {result.result.toFixed(2)} {currencyInfo[result.to]?.symbol || result.to}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            نرخ تبدیل: {result.rate.toFixed(4)}
          </Typography>
        </Box>
      )}
    </Box>
  );
} 