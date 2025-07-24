import React from "react";

const Switch = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm">{isDarkMode ? "Dark" : "Light"} Mode</span>
      <button
        onClick={toggleDarkMode}
        className={`w-10 h-5 flex items-center rounded-full p-1 ${
          isDarkMode ? "bg-gray-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            isDarkMode ? "translate-x-5" : ""
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Switch;
