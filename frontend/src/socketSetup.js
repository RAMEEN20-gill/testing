// socket.js
import { io } from 'socket.io-client';

const URL = 'http://localhost:5000'; // Change this if deployed

const socket = io(URL, {
  autoConnect: false,
});

export default socket;
