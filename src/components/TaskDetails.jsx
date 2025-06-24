function TaskDetails({ task }) {
  if (!task) return null; // Don't show anything until a task is selected

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Task Details</h3>
      <p><b>Title:</b> {task.title}</p>
      <p><b>Description:</b> {task.description}</p>
      <p><b>Status:</b> {task.status}</p>
      <p><b>Due Date:</b> {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskDetails; // ✅ Make sure this line is there
