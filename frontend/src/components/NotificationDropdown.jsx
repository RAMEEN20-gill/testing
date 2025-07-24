import React, { useState } from "react";
import { Bell, X } from "lucide-react";

const NotificationDropdown = ({ notifications = [], onClearNotifications }) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative focus:outline-none"
      >
        <Bell className="text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-md z-50">
          <div className="flex justify-between items-center p-3 border-b dark:border-gray-700">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Notifications
            </span>
            <button onClick={onClearNotifications}>
              <X size={16} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <li className="p-3 text-sm text-gray-600 dark:text-gray-400">
                No notifications
              </li>
            ) : (
              notifications.map((note, index) => (
                <li
                  key={index}
                  className="p-3 border-b text-sm text-gray-700 dark:text-gray-300 dark:border-gray-700"
                >
                  {note.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
