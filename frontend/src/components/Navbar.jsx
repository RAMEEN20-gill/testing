import React from "react";
import { Link } from "react-router-dom";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import NotificationDropdown from "./NotificationDropdown";

const Navbar = ({ onLogout, notifications, onClearNotifications }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center mb-6">
      <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
        Task Manager
      </Link>
      <div className="flex items-center space-x-4">
        <NotificationDropdown
          notifications={notifications}
          onClearNotifications={onClearNotifications}
        />
        <button
          onClick={toggleDarkMode}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
