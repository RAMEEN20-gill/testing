import { useState } from 'react';
import * as api from '../services/api';

function TaskDetails({ task }) {
  const [userIdToShareWith, setUserIdToShareWith] = useState('');
  const [shareMessage, setShareMessage] = useState('');

  if (!task) return null;

  const handleShare = async () => {
    try {
      const res = await api.shareTask(task._id, userIdToShareWith);
      setShareMessage(res.message || 'Task shared successfully!');
      setTimeout(() => setShareMessage(''), 3000);
      setUserIdToShareWith('');
    } catch (err) {
      setShareMessage('Failed to share task');
    }
  };

  return (
    <div className="mt-6 p-4 bg-white text-gray-900 rounded shadow border border-gray-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Details</h3>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description || "No description provided"}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>

      {/* 👇 Display shared users safely */}
      <p><strong>Shared With:</strong></p>
      <ul className="list-disc list-inside ml-4">
        {task.sharedWith && task.sharedWith.length > 0 ? (
          task.sharedWith.map((user, index) => (
            <li key={index}>
              {user && user.name && user.email
                ? `${user.name} (${user.email})`
                : 'Unknown user'}
            </li>
          ))
        ) : (
          <li>Not shared</li>
        )}
      </ul>

      <div className="mt-4">
        <input
          type="text"
          placeholder="User ID to share with"
          className="border px-2 py-1 rounded mr-2"
          value={userIdToShareWith}
          onChange={(e) => setUserIdToShareWith(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={handleShare}
        >
          Share Task
        </button>
        {shareMessage && <p className="mt-2 text-sm text-green-600">{shareMessage}</p>}
      </div>
    </div>
  );
}

export default TaskDetails;
