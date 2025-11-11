import React, { useEffect, useState } from 'react';
import './App.css';
import { getTasks, addTask, toggleTask, deleteTask, API_BASE } from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application component: renders header, add form, and task list.
   * Uses API base from process.env.REACT_APP_API_BASE with fallback to http://localhost:3001.
   */
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // initial load
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        if (mounted) setTodos(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError('Failed to load tasks. Please try again.');
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAdd = async (title) => {
    setBusy(true);
    setError('');
    try {
      const created = await addTask(title);
      setTodos((prev) => [created, ...prev]);
    } catch (e) {
      setError('Failed to add task.');
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  const handleToggle = async (id) => {
    setBusy(true);
    setError('');
    try {
      const updated = await toggleTask(id);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setError('Failed to update task.');
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (id) => {
    setBusy(true);
    setError('');
    try {
      await deleteTask(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError('Failed to delete task.');
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="App app-bg">
      <header className="header gradient">
        <div className="container">
          <h1 className="title">Personal To-Do</h1>
          <p className="subtitle">Stay organized with a simple task list</p>
        </div>
      </header>

      <main className="container stack">
        <div className="env-note" aria-label="Environment info">
          API: <code>{API_BASE}</code>
        </div>

        {error && (
          <div role="alert" className="alert error">
            {error}
          </div>
        )}

        <TodoForm onAdd={handleAdd} />

        {loading ? (
          <div className="card surface loading">Loading tasks...</div>
        ) : (
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
        )}

        {busy && <div className="spinner" aria-live="polite" aria-label="Working" />}
      </main>

      <footer className="footer container">
        <span>&copy; {new Date().getFullYear()} To-Do Manager</span>
      </footer>
    </div>
  );
}

export default App;
