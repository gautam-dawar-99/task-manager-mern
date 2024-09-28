const mongoose = require('mongoose');
const mongoUrl='mongodb+srv://Gautam:root@cluster0.wocng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
