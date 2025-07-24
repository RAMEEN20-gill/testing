// frontend/src/context/NotificationContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      const newSocket = io('http://localhost:5000', {
        auth: { token: user.token },
      });
      setSocket(newSocket);

      newSocket.on('newNotification', (notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });

      return () => newSocket.disconnect();
    }
  }, [user]);

  return (
    <NotificationContext.Provider value={{ socket, notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
