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
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/api/authentication', authenticationRoutes);
app.use('/api/user', userRoutes);
app.use('/api/wallet', transactionRoutes);


// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Handle end point not found errors
app.use((req, res) => {
  console.error('404 Not Found');
  console.error('Method:', req.method);
  console.error('URL:', req.originalUrl);
  console.error('Query:', req.query);
  console.error('Body:', req.body);
  res.status(404).json({ error: 'Endpoint Not Found'});
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});