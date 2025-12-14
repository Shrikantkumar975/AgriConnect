const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');

// Load environment variables from .env file into process.env.
dotenv.config();

const http = require('http');
const { initSocket } = require('./utils/socket');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());  // cors() → allow your React/Frontend to call this API
app.use(express.json());
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agriconnect');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');
const chatRoutes = require('./routes/chatRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const storageRequestRoutes = require('./routes/storageRequestRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/storage-requests', storageRequestRoutes);

// Serve static files
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('AgriConnect Pro API is running...');
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err); // Log the full error
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Initialize Socket.io
initSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
});
