// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import './App.css';
import './components/TaskList.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tasks:', err);
        setLoading(false);
      });
  }, []);

  const addTask = () => {
    if (!input.trim()) return;
    axios.post('http://localhost:5000/api/tasks', { title: input })
      .then(res => {
        setTasks([...tasks, res.data]);
        setInput('');
      })
      .catch(err => console.error('Failed to add task:', err));
  };

  const toggleComplete = (id, completed) => {
    axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed })
      .then(res => {
        setTasks(tasks.map(t => t._id === id ? res.data : t));
      })
      .catch(err => console.error('Failed to update task:', err));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(t => t._id !== id));
      })
      .catch(err => console.error('Failed to delete task:', err));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        <h1 className="todo-title">NextStep</h1>

        <div className="input-group">
          <div className="input-and-button">
            <input
              id="task-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What do you want to do?"
              className="todo-input"
            />
            <button onClick={addTask} className="todo-button">Add</button>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">Loading tasks...</p>
        ) : (
          <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
        )}
      </div>
    </div>
  );
}

export default App;
