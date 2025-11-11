import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { mockListOnce, mockAddOnce, mockToggleOnce, mockDeleteOnce } from './__mocks__/handlers';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

test('loads and renders tasks list', async () => {
  mockListOnce([{ id: 1, title: 'Test Task', completed: false }]);
  render(<App />);
  expect(await screen.findByText('Test Task')).toBeInTheDocument();
});

test('adds a task via form', async () => {
  mockListOnce([]);
  mockAddOnce({ id: 2, title: 'New Task', completed: false });
  render(<App />);

  const input = screen.getByPlaceholderText(/add a new task/i);
  fireEvent.change(input, { target: { value: 'New Task' } });

  const btn = screen.getByRole('button', { name: /add task/i });
  fireEvent.click(btn);

  expect(await screen.findByText('New Task')).toBeInTheDocument();
});

test('toggles a task', async () => {
  mockListOnce([{ id: 3, title: 'Toggle Me', completed: false }]);
  mockToggleOnce({ id: 3, title: 'Toggle Me', completed: true });
  render(<App />);

  const toggleBtn = await screen.findByRole('button', { name: /complete/i });
  fireEvent.click(toggleBtn);

  await waitFor(() => {
    expect(screen.getByText('Toggle Me')).toBeInTheDocument();
  });
});

test('deletes a task', async () => {
  mockListOnce([{ id: 4, title: 'Delete Me', completed: false }]);
  mockDeleteOnce();
  render(<App />);

  const deleteBtn = await screen.findByRole('button', { name: /delete task/i });
  fireEvent.click(deleteBtn);

  await waitFor(() => {
    expect(screen.queryByText('Delete Me')).not.toBeInTheDocument();
  });
});
