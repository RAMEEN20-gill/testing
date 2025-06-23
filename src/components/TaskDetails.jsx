function TaskDetails({ task }) {
 if (!task) return <p className="mt-6 text-gray-500">Select a task to see details</p>;

return (
  <div className="mt-6 bg-white p-4 border border-gray-200 rounded shadow-sm">
    <h3 className="text-lg font-semibold text-purple-700 mb-2">Task Details</h3>
    <p><b>Title:</b> {task.title}</p>
    <p><b>Description:</b> {task.description}</p>
    <p><b>Status:</b> {task.status}</p>
    <p><b>Due Date:</b> {new Date(task.dueDate).toLocaleDateString()}</p>
  </div>
);

}

export default TaskDetails;
