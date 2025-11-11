import React from 'react';
import TodoItem from './TodoItem';
import '../App.css';

// PUBLIC_INTERFACE
export default function TodoList({ todos, onToggle, onDelete }) {
  /** Renders a list of todos with actions. */
  if (!todos?.length) {
    return <div className="empty-state surface">No tasks yet. Add your first task above.</div>;
  }
  return (
    <ul className="todo-list" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
