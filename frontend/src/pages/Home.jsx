import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://stealth-a46a.onrender.com/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <div>
      <TaskForm />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <select
          className="p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Complete">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default Home;
