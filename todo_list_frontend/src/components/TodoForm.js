import React, { useState } from 'react';
import '../App.css';

// PUBLIC_INTERFACE
export default function TodoForm({ onAdd }) {
  /** Input form to add a new task; calls onAdd(title) on submit. */
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setTitle('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="todo-form card surface" onSubmit={handleSubmit} aria-label="Add task form">
      <input
        className="input"
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task title"
      />
      <button className="btn primary" type="submit" disabled={submitting || !title.trim()}>
        {submitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}
