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