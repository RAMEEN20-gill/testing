import { useState, useEffect } from 'react';

function TaskForm({ onSave, editTask }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  });

  useEffect(() => {
    if (editTask) setTask(editTask);
  }, [editTask]);

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(task);
    setTask({ title: '', description: '', status: '', dueDate: '' });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-50 p-6 rounded-lg shadow-md space-y-4 transition-all duration-300 mb-6"
    >
      <h2 className="text-xl font-semibold text-blue-800 mb-2">Add New Task</h2>

      {/* Title Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task title"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <input
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Details..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Status Dropdown */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          required
          className={`w-full p-2 border border-gray-300 rounded ${
            task.status === '' ? 'text-gray-400' : 'text-black'
          }`}
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Due Date Picker */}
     <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
  <input
    name="dueDate"
    type="date"
    value={task.dueDate}
    onChange={handleChange}
    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 placeholder-gray-400"
    style={{ color: task.dueDate ? '#1f2937' : '#9ca3af' }} // dark text if selected, gray otherwise
  />
</div>


      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Save Task
      </button>
    </form>
  );
}

export default TaskForm;
