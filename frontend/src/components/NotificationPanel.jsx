import React, { useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";

const NotificationPanel = ({ notifications, visible, toggleVisible }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        toggleVisible(false);
      }
    };
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, toggleVisible]);

  return (
    <div className="relative">
      <button onClick={() => toggleVisible(!visible)} className="text-white">
        <FaBell size={20} />
      </button>
      {visible && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          <div className="p-3 border-b font-semibold dark:text-white">
            Notifications
          </div>
          {notifications.length === 0 ? (
            <div className="p-3 text-sm text-gray-500 dark:text-gray-300">
              No notifications.
            </div>
          ) : (
            notifications.map((notif, index) => (
              <div
                key={index}
                className="px-3 py-2 text-sm border-b dark:border-gray-700 dark:text-gray-200"
              >
                {notif.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
