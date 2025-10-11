import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  Paper,
  Avatar
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        from: 'bot',
        text: "👋 Hi there! I'm **TechBot**, your personal shopping assistant at Tech Trove.",
      },
      {
        from: 'bot',
        text: 'I can help you explore products, track deliveries, and connect you to customer support. How can I assist you today?',
      },
    ]);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const lower = input.toLowerCase();

    setTimeout(() => {
      let reply = "I'm here to help! 😊";

      // 👇 Extended Smart Responses
      if (lower.includes('hello') || lower.includes('hi')) {
        reply = "Hey there! 👋 How can I make your Tech Trove experience better today?";
      } 
      else if (lower.includes('thank')) {
        reply = "You're most welcome! 🙌 It's always my pleasure to assist you. Anything else you'd like to know?";
      }
      else if (lower.includes('buy') || lower.includes('shop') || lower.includes('product')) {
        reply = "🛒 You can browse and buy amazing tech gadgets in the **Shop** section. Would you like me to guide you to trending products?";
      }
      else if (lower.includes('delivery') || lower.includes('shipping')) {
        reply = "🚚 Our delivery time usually ranges between **2-5 business days**, depending on your location. You can track it from your **Orders** section.";
      }
      else if (lower.includes('order') || lower.includes('track')) {
        reply = "📦 You can view and track your order in the **Orders** page. Just log into your account and click 'Order History'.";
      }
      else if (lower.includes('help') || lower.includes('support') || lower.includes('issue') || lower.includes('problem')) {
        reply = "💬 Our support team is always available! You can contact us at **support@techtrove.com** or use this chat for quick help.";
      }
      else if (lower.includes('guide') || lower.includes('assist')) {
        reply = "🤖 I can guide you through shopping, placing orders, or understanding products. What would you like help with today?";
      }
      else if (lower.includes('customer service') || lower.includes('agent') || lower.includes('contact')) {
        reply = "☎️ You can reach our customer service anytime at **support@techtrove.com** or through the contact form in the **Profile** section.";
      }
      else if (lower.includes('about')) {
        reply = "💡 **Tech Trove** is your one-stop destination for modern tech gadgets and accessories — curated for quality, innovation, and style.";
      }
      else if (lower.includes('bye') || lower.includes('goodbye') || lower.includes('see you')) {
        reply = "👋 Goodbye for now! Thanks for visiting Tech Trove. Come back anytime!";
      }

      setMessages((prev) => [...prev, { from: 'bot', text: reply }]);
    }, 800);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          height: '80vh',
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #fdfdfd, #f3f9ff)',
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: 'linear-gradient(90deg, #0F1C57, #00C9A7)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: '#00C9A7', mr: 2 }}>
            <SmartToyIcon />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            TechBot Assistant
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Chat Messages */}
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          overflowY: 'auto',
          height: 'calc(80vh - 150px)',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={msg.from === 'user' ? 'flex-end' : 'flex-start'}
          >
            <Paper
              elevation={3}
              sx={{
                p: 1.5,
                px: 2,
                backgroundColor: msg.from === 'user' ? '#00C9A7' : '#E8EAF6',
                color: msg.from === 'user' ? '#fff' : '#000',
                borderRadius: 3,
                maxWidth: '75%',
              }}
            >
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
      </DialogContent>

      {/* Input */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <TextField
          fullWidth
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          variant="outlined"
          sx={{
            backgroundColor: '#fff',
            borderRadius: 2,
          }}
        />
        <IconButton onClick={handleSend} color="primary">
          <SendIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
}
