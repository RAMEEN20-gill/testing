require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express(); // ✅ Define app before using it
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New socket connected:', socket.id);

  socket.on('register', (userId) => {
    socket.join(userId);
    console.log(`Socket ${socket.id} registered to user ${userId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err.message);
  });
});

// Attach io to every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.set('io', io);

// Routes (✅ after app is defined)
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/', (req, res) => res.send('API running'));

// Error handler
app.use(errorHandler);

// MongoDB and Server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err.message));
