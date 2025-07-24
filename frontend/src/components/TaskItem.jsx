import React from "react";
import { FaTrash, FaShareAlt, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const TaskItem = ({ task, onDelete, onToggle, onShare }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow mb-4 flex justify-between items-center">
      <div className="flex flex-col">
        <h3
          className={`text-lg font-semibold ${
            task.status === "completed" ? "line-through text-green-500" : ""
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
        {task.sharedWith?.length > 0 && (
          <p className="text-xs mt-1 text-blue-500">
            Shared with: {task.sharedWith.join(", ")}
          </p>
        )}
        {task.attachmentURL && (
          <a
            href={task.attachmentURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 mt-1 underline"
          >
            View Attachment
          </a>
        )}
      </div>
      <div className="flex space-x-3">
        <button
          className="text-green-600 hover:text-green-800"
          onClick={() => onToggle(task._id)}
          title="Mark as complete"
        >
          <FaCheckCircle />
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => onShare(task._id)}
          title="Share Task"
        >
          <FaShareAlt />
        </button>
        {(task.owner === user._id || user.email === "admin@example.com") && (
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(task._id)}
            title="Delete Task"
          >
            <FaTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
