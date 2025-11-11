# To-Do List Frontend (React)

A lightweight React app for managing personal to-do tasks with a modern "Ocean Professional" theme.

## Features

- Lightweight: vanilla CSS and React
- Modern UI: clean, responsive UI
- Simple integration: configurable backend base URL

## Prerequisites

- Node.js 16+ and npm
- Backend service running (Flask) on http://localhost:3001 (default)

## Environment

Copy .env.example to .env and adjust as needed:

```
cp .env.example .env
```

Edit .env to point to your backend:

```
REACT_APP_API_BASE=http://localhost:3001
```

The app defaults to http://localhost:3001 when REACT_APP_API_BASE is not set.

## Available Scripts

In the project directory, you can run:

### npm start
Runs the app in development mode.
- URL: http://localhost:3000

### npm test
Launches the test runner.

### npm run build
Builds the app for production to the build folder.

## Backend API Integration

This frontend expects the following backend routes:
- GET /api/tasks
- POST /api/tasks
- PATCH /api/tasks/{id}
- DELETE /api/tasks/{id}

The base URL is taken from REACT_APP_API_BASE. For example, GET http://localhost:3001/api/tasks.

OpenAPI docs (served by backend):
- Swagger UI: http://localhost:3001/docs
- OpenAPI JSON: http://localhost:3001/openapi.json

## CORS

Ensure the backend allows CORS for the frontend origin (http://localhost:3000 in development). If you restrict origins, include http://localhost:3000.

## Customization

Colors and component styles are in src/App.css.

To learn React, see the React documentation: https://reactjs.org/
