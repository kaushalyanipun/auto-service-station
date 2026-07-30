<<<<<<< HEAD
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
=======
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Console එකේ SQL queries පිරෙන එක නවත්වන්න
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Connected via Sequelize successfully! 🐘');
  } catch (error) {
    console.error('PostgreSQL Connection Error:', error);
  }
};

module.exports = { sequelize, connectDB };
>>>>>>> 8ea19ba44b640e527729cb8d641032d6b9f3a928
