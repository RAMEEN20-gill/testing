function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Task List</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id || task._id}
              className="flex items-center justify-between p-4 bg-blue-100 rounded"
            >
              <div>
                <p className="font-bold text-blue-900">{task.title}</p>
                <p className="text-sm text-gray-600">{task.status} — {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
