// app.js
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tasks', taskRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.status(200).send('API running');
});

app.use(errorHandler);

module.exports = app; // ✅ export only the app (no server or DB here)