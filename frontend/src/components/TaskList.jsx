function TaskList({ tasks, onEdit, onDelete, onView }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Task List</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id || task._id}
              className="p-4 rounded shadow flex justify-between items-center bg-white text-gray-900 border border-gray-300 cursor-pointer"
              onClick={() => onView(task)} // ✅ show task details on click
            >
              <div>
                <p className="font-bold text-lg">{task.title}</p>
                <p className="text-sm text-gray-700">
                  {task.status} — {new Date(task.dueDate).toLocaleDateString()}
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
                    onDelete(task.id);
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
