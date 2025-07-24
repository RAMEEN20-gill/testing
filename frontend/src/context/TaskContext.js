// frontend/src/context/TaskContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [sharedTasks, setSharedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const fetchSharedTasks = async () => {
    try {
      const res = await axios.get('/api/tasks/shared', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSharedTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch shared tasks:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchSharedTasks();
      setLoading(false);
    }
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        sharedTasks,
        fetchTasks,
        fetchSharedTasks,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
