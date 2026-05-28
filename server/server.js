// Force Node.js to use clean public DNS servers to resolve MongoDB Atlas SRV records
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const crmRoutes = require('./routes/crmRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const reportsRoutes = require('./routes/reportsRoutes');

const app = express();

// Initialize MongoDB Atlas Connection
connectDB();

// Global Middleware Configs (Allows your cross-origin React port to stream transactions)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// API Route Mount Ports
app.use('/api/auth', authRoutes);
app.use('/api/crm', crmRoutes);             // <-- Mount point for Contact/Leads submissions
app.use('/api/inventory', inventoryRoutes); // <-- Mount point for Public & Admin Projects
app.use('/api/sales', salesRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/reports', reportsRoutes);

app.get('/', (req, res) => {
  res.send('1H-Home Corporate Core API Engine Online.');
});

// Robust Error Handling Catch Engine (Patched to fix "next is not a function" breaks)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server executing in ${process.env.NODE_ENV || 'development'} configuration on port ${PORT}`);
});