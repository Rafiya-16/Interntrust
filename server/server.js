const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware: lets the server understand JSON request bodies
app.use(express.json());
// Middleware: allows the frontend (different port) to talk to this backend
app.use(cors());

// Health check route — confirms the server is alive
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));