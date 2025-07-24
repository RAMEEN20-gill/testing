function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}

function sendNotification(io, userId, message) {
  io.to(userId).emit("notification", message);
}

module.exports = { setupSocket, sendNotification };

