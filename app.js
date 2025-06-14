require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const authenticationRoutes = require('./src/routes/authenticationRoutes');
const userRoutes = require('./src/routes/userRoutes')
const transactionRoutes = require('./src/routes/transactionRoutes')



const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());


app.use('/api/authentication', authenticationRoutes);
app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoutes);


// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});