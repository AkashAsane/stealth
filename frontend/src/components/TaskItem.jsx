import React from 'react';

const TaskItem = ({ task, onDelete, onStatusChange }) => {
  const { _id, title, description, priority, status, creationDate } = task;

  const handleStatusToggle = () => {
    const newStatus = status === 'Complete' ? 'Incomplete' : 'Complete';
    onStatusChange(_id, newStatus);
  };

  return (
    <div className="p-4 border rounded shadow-sm mb-4 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-sm text-gray-500">Priority: {priority}</p>
          <p className="text-sm text-gray-400">Created: {new Date(creationDate).toLocaleString()}</p>
        </div>
        <div>
          <button
            onClick={handleStatusToggle}
            className={`px-4 py-2 rounded ${
              status === 'Complete' ? 'bg-green-500' : 'bg-yellow-500'
            } text-white`}
          >
            {status === 'Complete' ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="ml-2 px-4 py-2 rounded bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
