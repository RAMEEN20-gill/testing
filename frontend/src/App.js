import { useEffect, useRef, useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import * as api from './services/api';
import './index.css';
import { io } from 'socket.io-client'; // Import socket.io-client

const socket = io('http://localhost:5000'); // Change if deployed

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [notification, setNotification] = useState(null); // Real-time notification
  const formRef = useRef(null);
  const limit = 5;

  // Reset page on search/filter change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, filterStatus]);

  // Load tasks
  useEffect(() => {
    const shouldShowView = !!searchTerm || !!filterStatus;
    loadTasks(shouldShowView);
  }, [page, searchTerm, filterStatus]);

  // Listen for notifications
  useEffect(() => {
    socket.on('notification', (data) => {
      setNotification(data.message);
      setTimeout(() => setNotification(null), 4000);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  async function loadTasks(showSingleTask = false) {
    try {
      const data = await api.getTasks(page, limit, searchTerm, filterStatus);
      setTasks(data.tasks);
      setTotalTasks(data.total);
      setCompletedTasks(data.completed);
      setTotalPages(Math.max(Math.ceil(data.total / limit), 1));

      if (showSingleTask && data.tasks.length === 1) {
        setViewTask(data.tasks[0]);
      } else if (showSingleTask) {
        setViewTask(null);
      }
    } catch (error) {
      console.error("Failed to load tasks:", error.message);
    }
  }

  async function handleSave(task) {
    try {
      if (task.id || task._id) {
        await api.updateTask(task.id || task._id, task);
        setSuccessMessage('Task updated successfully!');
      } else {
        await api.createTask(task);
        setSuccessMessage('Task created successfully!');
      }

      setEditTask(null);
      setViewTask(null);
      await loadTasks(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error saving task:", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await api.deleteTask(id);
      setSuccessMessage('Task deleted successfully!');
      await loadTasks(false);
      setViewTask(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  }

  const completionRate = totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-2xl md:text-4xl font-bold text-blue-600 underline text-center mb-6">
          Task Manager
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 font-medium rounded text-center">
            {successMessage}
          </div>
        )}

        {/* Real-Time Notification */}
        {notification && (
          <div className="mb-4 px-4 py-2 bg-yellow-100 text-yellow-800 font-medium rounded text-center">
            🔔 {notification}
          </div>
        )}

        {/* Task Form */}
        <div ref={formRef}>
          <TaskForm
            onSave={handleSave}
            editTask={editTask}
            clearEditTask={() => setEditTask(null)}
          />
        </div>

        {/* Search and Filter */}
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

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <div className="mb-6 px-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Task Completion Progress</h3>
            <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
              <div className="bg-green-500 h-full" style={{ width: `${completionRate}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{completionRate}% completed</p>
          </div>
        )}

        <TaskList
          tasks={tasks}
          onView={(task) => setViewTask(task)}
          onEdit={(task) => {
            setEditTask(task);
            setViewTask(task);
            setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
          }}
          onDelete={handleDelete}
        />

        {viewTask && <TaskDetails task={viewTask} />}

        <div className="flex justify-between items-center mt-6 px-4">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
