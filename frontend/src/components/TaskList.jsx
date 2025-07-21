function TaskList({ tasks, onEdit, onDelete, onView }) {
  // Share handler function
  const handleShare = async (taskId) => {
    const username = prompt("Enter the username to share with:");
    if (!username) return;

    const email = prompt("Enter the email to share with:");
    if (!email) return;

    try {
      const response = await fetch(`/api/tasks/${taskId}/share`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username, email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Task shared successfully!");
      } else {
        alert(data.message || "❌ Failed to share task.");
      }
    } catch (error) {
      console.error("Error sharing task:", error);
      alert("❌ An error occurred while sharing the task.");
    }
  };

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
              className="p-4 rounded shadow flex justify-between items-center bg-white text-gray-900 border border-gray-300"
              onClick={() => onView(task)}
            >
              <div>
                <p className="font-bold text-lg">{task.title}</p>
                <p className="text-sm text-gray-700">
                  {task.status} —{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                  }}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(task._id || task.id);
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(task._id || task.id);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Share
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
