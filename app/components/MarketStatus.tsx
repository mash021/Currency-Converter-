'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';

export default function MarketStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMarketStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hours * 60 + minutes;

      // Market is open between 9:00 AM and 5:00 PM
      const marketOpenTime = 9 * 60;  // 9:00 AM
      const marketCloseTime = 17 * 60;  // 5:00 PM

      setIsOpen(currentTime >= marketOpenTime && currentTime < marketCloseTime);
    };

    // Check initially
    checkMarketStatus();

    // Check every minute
    const interval = setInterval(checkMarketStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Alert severity={isOpen ? "success" : "warning"}>
        بازار در حال حاضر {isOpen ? "باز" : "بسته"} است
        {!isOpen && " (ساعات کاری: ۹ صبح تا ۵ عصر)"}
      </Alert>
    </Box>
  );
} 