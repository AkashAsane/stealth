import React, { useState } from 'react';
import axios from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/tasks', { title, description, priority, status: 'Incomplete' }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTaskAdded(response.data);
      setTitle('');
      setDescription('');
      setPriority('Low');
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <form className="mb-6 bg-white shadow-md p-4 rounded" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        className="w-full p-2 mb-4 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        className="w-full p-2 mb-4 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full p-2 mb-4 border rounded"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
