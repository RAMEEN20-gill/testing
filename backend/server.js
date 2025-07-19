const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with CORS config
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Change "*" to your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Store connected users: { userId: socketId }
const connectedUsers = {};

// Setup WebSocket connection
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // Register user with their userId
  socket.on('register', (userId) => {
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const [userId, socketId] of Object.entries(connectedUsers)) {
      if (socketId === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

// Attach io to app for global access in routes/controllers
app.set('io', io);
app.set('connectedUsers', connectedUsers); // Also expose connected users if needed

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
