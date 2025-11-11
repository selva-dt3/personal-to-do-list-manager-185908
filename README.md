# Personal To-Do List Manager

This repository contains the frontend (React) and backend (Flask) for a simple to-do list application.

## Containers

- Frontend: personal-to-do-list-manager-185908/todo_list_frontend
  - Dev URL: http://localhost:3000
- Backend: personal-to-do-list-manager-185909/backend
  - Docs: http://localhost:3001/docs
  - OpenAPI: http://localhost:3001/openapi.json

## Quick Start

1) Start the backend (Flask)
- Ensure Python environment and dependencies are installed (see backend README).
- Run the backend server on port 3001.

2) Configure the frontend
- cd personal-to-do-list-manager-185908/todo_list_frontend
- cp .env.example .env
- Ensure .env contains:
  REACT_APP_API_BASE=http://localhost:3001

3) Start the frontend
- npm install
- npm start
- Open http://localhost:3000

## API Contract

Frontend expects these endpoints:
- GET /api/tasks
- POST /api/tasks
- PATCH /api/tasks/{id}
- DELETE /api/tasks/{id}

Refer to the backend OpenAPI at /openapi.json for the full schema.

## CORS

The backend should allow requests from the frontend origin http://localhost:3000 during development.
If backend CORS is restricted, add http://localhost:3000 to the allowed origins.
