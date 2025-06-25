function TaskDetails({ task }) {
  if (!task) return null; // Don't show anything until a task is selected

  return (
    <div className="mt-6 p-4 bg-white text-gray-900 rounded shadow border border-gray-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Details</h3>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description || "No description provided"}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due Date:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
    </div>
  );
}

export default TaskDetails;
