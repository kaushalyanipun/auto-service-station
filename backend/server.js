<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
  res.json({ message: 'Auto Service Station API is running...' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
=======
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
>>>>>>> 8ea19ba44b640e527729cb8d641032d6b9f3a928
});