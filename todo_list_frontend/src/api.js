const DEFAULT_BASE = 'http://localhost:3001';

/**
 * Resolve API base URL from environment with sensible fallback.
 * Uses REACT_APP_API_BASE as the primary variable.
 */
export const API_BASE =
  (typeof process !== 'undefined' &&
    process.env &&
    (process.env.REACT_APP_API_BASE ||
      process.env.REACT_APP_BACKEND_URL)) ||
  DEFAULT_BASE;

/**
 * Internal helper to perform fetch requests with JSON handling.
 * Prefixes provided path with API_BASE.
 */
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
  /**
   * Fetch list of tasks from backend.
   * Returns array of {id, title, completed}.
   * Backend route: GET /api/tasks
   */
  return request('/api/tasks', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function addTask(title) {
  /**
   * Add a new task with given title.
   * Backend route: POST /api/tasks
   * Returns created task.
   */
  return request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title }),
  });
}

// PUBLIC_INTERFACE
export async function toggleTask(id) {
  /**
   * Toggle completion or update a task by ID.
   * Using PATCH /api/tasks/{id} with completed toggled to true/false is
   * a UI choice; here, we toggle client-side and send PATCH.
   * For simplicity, the UI expects backend to toggle when no body is provided.
   * If backend requires explicit completed value, adjust to send { completed }.
   */
  return request(`/api/tasks/${id}`, {
    method: 'PATCH',
    // Body omitted to allow backend-side toggle if implemented that way.
  });
}

// PUBLIC_INTERFACE
export async function deleteTask(id) {
  /**
   * Delete a task by ID.
   * Backend route: DELETE /api/tasks/{id}
   */
  return request(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}
