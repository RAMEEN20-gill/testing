const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { setupSocket } = require("./socket/socket");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const notificationRoutes = require("./routes/notificationRoutes");

const analyticsRoutes = require("./routes/analyticsRoutes");


const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Setup socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
setupSocket(io);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Use routes directly (they must export `express.Router()` objects)
app.use("/api/users", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/analytics", analyticsRoutes);


// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
