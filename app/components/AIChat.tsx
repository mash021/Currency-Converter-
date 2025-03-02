import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Avatar, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { getChatResponse } from '../services/ai';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input);
      const botMessage: Message = {
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: Message = {
        text: 'متاسفانه در ارتباط با هوش مصنوعی مشکلی پیش آمده است.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: '500px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        دستیار هوشمند ارزی
      </Typography>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto', mb: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', maxWidth: '70%' }}>
              {message.sender === 'bot' && (
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                  <SmartToyIcon />
                </Avatar>
              )}
              <Paper
                elevation={1}
                sx={{
                  p: 1,
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                  color: message.sender === 'user' ? 'white' : 'text.primary',
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
              {message.sender === 'user' && (
                <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>
                  <PersonIcon />
                </Avatar>
              )}
            </Box>
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="پیام خود را بنویسید..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          disabled={isLoading}
        >
          ارسال
        </Button>
      </Box>
    </Paper>
  );
} 