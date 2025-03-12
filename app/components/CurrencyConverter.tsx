'use client';

import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box, Typography, IconButton } from '@mui/material';
import { ConversionResult } from '../../types/currency';
import { currencyInfo } from '../../utils/currencyData';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

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

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (result) {
      setAmount(result.result.toFixed(2));
      handleConvert(result.result.toFixed(2), toCurrency, fromCurrency);
    }
  };

  const handleConvert = (
    currentAmount = amount,
    currentFrom = fromCurrency,
    currentTo = toCurrency
  ) => {
    const numAmount = parseFloat(currentAmount);
    if (isNaN(numAmount)) return;

    let rate: number;
    if (currentFrom === baseCurrency) {
      rate = rates[currentTo];
    } else if (currentTo === baseCurrency) {
      rate = 1 / rates[currentFrom];
    } else {
      const fromRate = rates[currentFrom];
      const toRate = rates[currentTo];
      rate = toRate / fromRate;
    }

    const convertedAmount = numAmount * rate;
    setResult({
      amount: numAmount,
      from: currentFrom,
      to: currentTo,
      result: convertedAmount,
      rate
    });
  };

  const renderCurrencyOption = (currency: string) => {
    const info = currencyInfo[currency] || {
      code: currency,
      name: currency,
      symbol: currency
    };
    return (
      <MenuItem key={currency} value={currency} className="text-light hover:bg-dark-200">
        <Box className="flex items-center gap-2">
          <span>{currency}</span>
          <span className="text-accent/70 mr-auto">
            {info.name}
          </span>
        </Box>
      </MenuItem>
    );
  };

  return (
    <Box className="card">
      <Typography variant="h5" gutterBottom className="text-light">
        تبدیل ارز
      </Typography>
      <TextField
        fullWidth
        label="مقدار"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-dark mb-4"
      />
      <div className="flex items-center gap-4 mb-4">
        <TextField
          fullWidth
          select
          label="از ارز"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="input-dark"
        >
          {currencies.map(renderCurrencyOption)}
        </TextField>
        <IconButton 
          onClick={handleSwap}
          className="text-accent hover:text-accent/80"
          disabled={!toCurrency}
        >
          <SwapHorizIcon />
        </IconButton>
        <TextField
          fullWidth
          select
          label="به ارز"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="input-dark"
        >
          {currencies.map(renderCurrencyOption)}
        </TextField>
      </div>
      <Button
        fullWidth
        variant="contained"
        onClick={() => handleConvert()}
        disabled={!amount || !fromCurrency || !toCurrency}
        className="bg-accent hover:bg-accent/90"
      >
        تبدیل
      </Button>

      {result && (
        <Box className="mt-4 p-4 glass-morphism">
          <Typography variant="body1" className="text-light">
            {result.amount} {currencyInfo[result.from]?.symbol || result.from} = {result.result.toFixed(2)} {currencyInfo[result.to]?.symbol || result.to}
          </Typography>
          <Typography variant="body2" className="text-accent/70">
            نرخ تبدیل: {result.rate.toFixed(4)}
          </Typography>
        </Box>
      )}
    </Box>
  );
} 