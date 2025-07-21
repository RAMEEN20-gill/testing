module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      socket.join(userId); // join user-specific room
      console.log("User connected:", userId);
    }

    socket.on("disconnect", () => {
      console.log("User disconnected:", userId);
    });
  });

  return io;
};
