'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function AIChat() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('متأسفانه در دریافت پاسخ مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Typography 
        variant="h5" 
        sx={{
          color: '#0078ff',
          fontFamily: 'Vazir',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 3
        }}
      >
        دستیار هوشمند ارزی
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          multiline
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="سؤال خود را بپرسید..."
          variant="outlined"
          disabled={loading}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#ffffff',
              borderColor: '#0078ff',
              '&:hover': {
                borderColor: '#3399ff',
              },
              '&.Mui-focused': {
                borderColor: '#66b3ff',
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading || !message.trim()}
          endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
          sx={{
            backgroundColor: '#0078ff',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#0056b3',
            },
            fontFamily: 'Vazir',
            fontWeight: 'bold',
          }}
        >
          ارسال
        </Button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-dark-200 rounded-lg border-2 border-blue-500">
          <Typography 
            variant="body1" 
            sx={{
              color: '#ffffff',
              fontFamily: 'Vazir',
              whiteSpace: 'pre-wrap',
            }}
          >
            {response}
          </Typography>
        </div>
      )}
    </div>
  );
} 