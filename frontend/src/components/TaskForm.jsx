import { useState, useEffect, useRef } from 'react';

function TaskForm({ onSave, editTask }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  });

  const titleRef = useRef();

  useEffect(() => {
    if (editTask) {
      setTask(editTask);
      setTimeout(() => titleRef.current?.focus(), 100);
    } else {
      setTask({ title: '', description: '', status: '', dueDate: '' });
    }
  }, [editTask]);

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(task);

    if (!task.id && !task._id) {
      setTask({ title: '', description: '', status: '', dueDate: '' });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-50 p-6 rounded-lg shadow-md space-y-4 transition-all duration-300 mb-6"
    >
      <h2 className="text-xl font-semibold text-blue-800 mb-2">
        {editTask ? 'Edit Task' : 'Add New Task'}
      </h2>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          name="title"
          ref={titleRef}
          value={task.title}
          onChange={handleChange}
          placeholder="Task title"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Details..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
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

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={task.dueDate}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700 placeholder-gray-400"
          style={{ color: task.dueDate ? '#1f2937' : '#9ca3af' }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {editTask ? 'Update Task' : 'Save Task'}
      </button>
    </form>
  );
}

export default TaskForm;
