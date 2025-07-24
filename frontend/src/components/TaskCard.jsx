import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Share } from "lucide-react";

const TaskCard = ({ task, onEdit, onDelete, onShare }) => {
  const statusColor =
    task.status === "completed"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <div className="p-4 rounded-2xl shadow-md bg-white dark:bg-gray-800 border dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
          <p className={`inline-block px-2 py-1 mt-2 text-xs rounded ${statusColor}`}>
            {task.status}
          </p>
          {task.sharedBy && (
            <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
              Shared by: {task.sharedBy.name}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(task)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(task._id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onShare(task)}>
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
