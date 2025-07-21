import { useEffect, useState } from 'react';

const SharedTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchSharedTasks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. Are you logged in?");
        return;
      }

      try {
        const res = await fetch('/api/tasks/shared', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("Shared Tasks:", data);

        if (!res.ok) throw new Error(data.message || "Failed to fetch");
        setTasks(data);
      } catch (err) {
        console.error("Error fetching shared tasks:", err.message);
      }
    };

    fetchSharedTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks Shared With Me</h2>
      {tasks.length === 0 ? (
        <p>No tasks shared with you yet.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl p-4 mb-4 shadow-md border"
          >
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">Owner: {task.owner?.email}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SharedTasks;
