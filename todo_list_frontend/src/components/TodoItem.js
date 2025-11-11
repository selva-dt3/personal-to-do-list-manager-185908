import React from 'react';
import '../App.css';

// PUBLIC_INTERFACE
export default function TodoItem({ todo, onToggle, onDelete }) {
  /** Renders a single todo with actions. */
  return (
    <li className={`todo-item surface ${todo.completed ? 'completed' : ''}`} role="listitem">
      <div className="todo-left">
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="todo-title">{todo.title}</span>
      </div>
      <div className="todo-actions">
        <button className="btn subtle" onClick={() => onToggle(todo.id)} aria-label="Toggle task">
          {todo.completed ? 'Undo' : 'Complete'}
        </button>
        <button className="btn danger" onClick={() => onDelete(todo.id)} aria-label="Delete task">
          Delete
        </button>
      </div>
    </li>
  );
}
