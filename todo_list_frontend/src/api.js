const DEFAULT_BASE = 'http://localhost:3001';

/**
 * Resolve API base URL from environment with sensible fallback.
 */
export const API_BASE =
  (typeof process !== 'undefined' &&
    process.env &&
    (process.env.REACT_APP_API_BASE ||
      process.env.REACT_APP_BACKEND_URL)) ||
  DEFAULT_BASE;

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  const resp = await fetch(url, { ...options, headers });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    const err = new Error(`Request failed: ${resp.status} ${resp.statusText} - ${text}`);
    err.status = resp.status;
    throw err;
  }
  // Try parse JSON; allow empty body
  const contentType = resp.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return resp.json();
  }
  return null;
}

// PUBLIC_INTERFACE
export async function getTasks() {
  /** Fetch list of todos from backend. Returns array of {id, title, completed}. */
  return request('/todos', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function addTask(title) {
  /** Add a new todo with given title. Returns created todo. */
  return request('/todos', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

// PUBLIC_INTERFACE
export async function toggleTask(id) {
  /** Toggle completion state of a todo by ID. Returns updated todo. */
  return request(`/todos/${id}/toggle`, {
    method: 'PATCH',
  });
}

// PUBLIC_INTERFACE
export async function deleteTask(id) {
  /** Delete a todo by ID. Returns success or deleted item. */
  return request(`/todos/${id}`, {
    method: 'DELETE',
  });
}
