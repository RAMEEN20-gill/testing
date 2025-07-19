import React from 'react';

function TaskList({ tasks, onEdit, onDelete, onView }) {
  console.log('🔍 TaskList received tasks:', tasks); // Debug: See what's coming in

  // Handle undefined or non-array tasks
  if (!Array.isArray(tasks)) {
    return <p className="text-red-500">Tasks not loaded or invalid format.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Task List</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id || task.id}
              className="p-4 rounded shadow flex justify-between items-center bg-white text-gray-900 border border-gray-300 cursor-pointer"
              onClick={() => onView(task)} // ✅ show task details on click
            >
              <div>
                <p className="font-bold text-lg">{task.title}</p>
                <p className="text-sm text-gray-700">
                  {task.status} —{' '}
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering onView
                    onEdit(task);
                  }}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent triggering onView
                    onDelete(task._id || task.id); // ✅ use _id fallback
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
