// --- src/pages/SharedTasks.jsx ---
import React, { useEffect, useState } from 'react';
import axios from '../services/api';

export default function SharedTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchSharedTasks = async () => {
      try {
        const res = await axios.get('/tasks/shared');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSharedTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Shared Tasks</h1>
      {tasks.map(task => (
        <div key={task._id} className="p-4 border rounded mb-2">
          <h2 className="text-xl font-semibold">{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}