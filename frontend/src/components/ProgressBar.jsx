import React from "react";

const ProgressBar = ({ completed, total }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="my-4">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-700 dark:text-white">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        <div
          className="h-4 bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
