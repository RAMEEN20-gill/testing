import React, { useEffect, useState } from "react";
import axios from "axios";

const SharedTasks = () => {
  const [sharedTasks, setSharedTasks] = useState([]);

  const fetchSharedTasks = async () => {
    try {
      const res = await axios.get("/api/tasks/shared");
      setSharedTasks(res.data);
    } catch (error) {
      console.error("Error fetching shared tasks", error);
    }
  };

  useEffect(() => {
    fetchSharedTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Tasks Shared With You
      </h2>
      {sharedTasks.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No tasks shared with you.</p>
      ) : (
        sharedTasks.map((task) => (
          <div
            key={task._id}
            className="border dark:border-gray-600 p-3 rounded-lg shadow-sm mb-2 bg-white dark:bg-gray-800"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{task.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Shared by: {task.owner?.email || "Unknown"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default SharedTasks;
