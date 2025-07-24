import React from "react";

const AnalyticsCard = ({ title, value, color }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl w-full sm:w-auto`}
    >
      <h4 className="text-sm text-gray-600 dark:text-gray-300 mb-1">
        {title}
      </h4>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default AnalyticsCard;
