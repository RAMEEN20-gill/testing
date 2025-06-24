import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import * as api from './services/api';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error.message);
    }
  }

  async function handleSave(task) {
    try {
      if (task.id || task._id) {
        await api.updateTask(task.id || task._id, task);
      } else {
        await api.createTask(task);
      }
      loadTasks();
      setEditTask(null);
    } catch (error) {
      console.error("Error saving task:", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === '' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-600 underline text-center mb-6">
          Task Manager
        </h1>

        {/* 📝 Task Form */}
        <TaskForm onSave={handleSave} editTask={editTask} />

        {/* ℹ️ Instruction heading */}
        <h3 className="text-md font-medium text-gray-700 mb-2 text-center">
          Select a task to see details
        </h3>

        {/* 🔍 Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 px-4">
          <input
            type="text"
            placeholder="Search by title or description"
            className="p-2 border rounded w-full md:w-1/2 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded w-full md:w-1/4 text-black"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* 📋 Task List */}
        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => {
            setEditTask(task);
            setViewTask(task);
          }}
          onDelete={handleDelete}
        />

        {/* 📄 Task Details */}
        <TaskDetails task={viewTask} />
      </div>
    </div>
  );
}

export default App;
