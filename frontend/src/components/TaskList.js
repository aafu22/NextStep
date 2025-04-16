// src/components/TaskList.js
import React from 'react';
import './TaskList.css';

function TaskList({ tasks, toggleComplete, deleteTask }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty-text">No tasks yet. Add one!</p>
      ) : (
        tasks.map(task => (
          <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task._id, task.completed)}
              />
              <span className="custom-checkbox"></span>
              <span className="task-title">{task.title}</span>
            </label>
            <button className="delete-button" onClick={() => deleteTask(task._id)}>🗑</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
