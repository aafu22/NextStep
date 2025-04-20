const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/tasks', taskRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
