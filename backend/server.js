const express = require('express');
const { connectDB } = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Check Root Route
app.get('/', (req, res) => {
  res.send('Auto Service Station Backend API Running...');
});

// Database Connect කිරීම
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});