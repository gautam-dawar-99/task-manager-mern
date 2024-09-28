const express = require('express');
const connectDB = require('./connection');
// const dotenv = require('dotenv');
const cors = require('cors');
const taskRoutes = require('./taskRoutes');

// dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/tasks', taskRoutes);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
