import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
