'use client';

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress, Grid } from '@mui/material';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyRates from './components/CurrencyRates';
import RateAlert from './components/RateAlert';
import MarketStatus from './components/MarketStatus';
import AIChat from './components/AIChat';
import { CurrencyRate, AlertSetting } from '../types/currency';

export default function Home() {
  const [currencyData, setCurrencyData] = useState<CurrencyRate | null>(null);
  const [alerts, setAlerts] = useState<AlertSetting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
      const data = await response.json();
      if (data.result === 'success') {
        setCurrencyData({
          timestamp: Math.floor(Date.now() / 1000),
          base: data.base_code,
          date: new Date().toISOString().split('T')[0],
          rates: data.conversion_rates
        });
      } else {
        console.error('Error fetching rates:', data.error);
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Fetch rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currencyData && alerts.length > 0) {
      alerts.forEach(alert => {
        let currentRate;
        if (alert.fromCurrency === currencyData.base) {
          currentRate = currencyData.rates[alert.toCurrency];
        } else if (alert.toCurrency === currencyData.base) {
          currentRate = 1 / currencyData.rates[alert.fromCurrency];
        } else {
          const fromRate = currencyData.rates[alert.fromCurrency];
          const toRate = currencyData.rates[alert.toCurrency];
          currentRate = toRate / fromRate;
        }

        if (currentRate >= alert.targetRate) {
          // Show browser notification
          if (Notification.permission === 'granted') {
            new Notification('نرخ ارز به هدف رسید!', {
              body: `نرخ ${alert.fromCurrency} به ${alert.toCurrency} به ${currentRate.toFixed(4)} رسید`
            });
          }
        }
      });
    }
  }, [currencyData, alerts]);

  const handleAddAlert = (alert: AlertSetting) => {
    setAlerts([...alerts, alert]);
  };

  const handleDeleteAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currencyData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          خطا در دریافت اطلاعات نرخ ارز
        </Typography>
      </Box>
    );
  }

  const currencies = [currencyData.base, ...Object.keys(currencyData.rates)];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CurrencyConverter rates={currencyData.rates} baseCurrency={currencyData.base} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CurrencyRates currencyData={currencyData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RateAlert
            currencies={currencies}
            onAddAlert={handleAddAlert}
            alerts={alerts}
            onDeleteAlert={handleDeleteAlert}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AIChat />
        </Grid>
      </Grid>
    </Container>
  );
} 