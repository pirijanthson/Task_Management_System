# Task Management System

A full-stack, responsive Task Management System built with React, Vite, TypeScript, Tailwind CSS, Express, TypeScript, and Prisma ORM with PostgreSQL. Features real-time metric tracking, interactive table/grid task management views, glassmorphism UI design, Dark & Light mode toggling, JWT authentication, and unit testing suites.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Installation Instructions](#installation-instructions)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Backend](#running-the-backend)
- [Running the Frontend](#running-the-frontend)
- [API Documentation](#api-documentation)
- [Unit Testing](#unit-testing)
- [Assumptions Made](#assumptions-made)
- [Known Limitations](#known-limitations)

---

## Project Overview
The Task Management System enables users to manage their daily workplace tasks cleanly across Desktop, Tablet, and Mobile screens. Features include:
- **Authentication**: Secure JWT login with password encryption (`bcryptjs`) and token revocation on logout.
- **Dashboard Command Center**: Real-time stats widgets (Total Tasks, Pending, Active, Completed, Overdue) with completion rate progress indicators.
- **Task Management**: Full CRUD operations on tasks with filtering by status, filtering by priority, sorting (Newest, Oldest, Due Date), and search functionality.
- **Dual View Modes**: Seamless switching between interactive Table View and Grid Cards View.
- **Dark & Light Mode**: System color scheme auto-detection with manual dark/light toggle and local storage persistence.

---

## Technology Stack

### Frontend
- **Framework**: React 19 + Vite (TypeScript)
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism utilities & CSS variables
- **Animations**: Framer Motion & Lucide React Icons
- **HTTP Client**: Axios with interceptors
- **Notifications**: React Hot Toast
- **Testing**: Vitest + React Testing Library + jsdom

### Backend
- **Runtime**: Node.js + Express (TypeScript)
- **Database & ORM**: PostgreSQL + Prisma ORM
- **Authentication**: JSON Web Tokens (JWT) + Bcrypt.js
- **Validation**: Zod schema validation
- **Testing**: Jest + Supertest

---

## Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) database server running locally or hosted

### Clone Repository
```bash
git clone https://github.com/your-username/Task_Management_System.git
cd Task_Management_System
```

---

## Environment Variables

### Backend Environment Variables (`backend/.env`)
Create a `.env` file inside the `backend/` directory:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_management?schema=public"
PORT=5000
JWT_SECRET="task_management_secret_key_change_me"
```

### Frontend Environment Variables (`frontend/.env`)
Create a `.env` file inside the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Database Setup

1. **Navigate to the backend folder**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Run Prisma Migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **(Optional) Seed Database**:
   ```bash
   npx prisma db seed
   ```

---

## Running the Backend

From the `backend/` directory:

```bash
# Development Mode
npm run dev

# Production Build
npm run build
npm start

# Run Unit & Integration Tests
npm test
```
The backend API server will run at `http://localhost:5000`.

---

## Running the Frontend

From the `frontend/` directory in a separate terminal:

1. **Install frontend dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Run Production Build Verification**:
   ```bash
   npm run build
   ```

4. **Run Unit Tests**:
   ```bash
   npm test
   ```
The frontend dev server will launch at `http://localhost:5173`.

---

## API Documentation

### Base URL
`http://localhost:5000/api`

### Authentication Endpoints

| Method | Endpoint | Description | Request Body / Headers |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | User login | `{ "email": "user@example.com", "password": "password123" }` |
| `POST` | `/auth/logout` | User logout & revoke JWT | Header: `Authorization: Bearer <token>` |

### Task Endpoints (Protected - Requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description | Query Parameters / Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks/stats` | Get dashboard statistics | None |
| `GET` | `/tasks` | List tasks | Query: `search`, `status`, `priority`, `sort` |
| `GET` | `/tasks/:id` | Get single task | Route param: `id` |
| `POST` | `/tasks` | Create task ticket | `{ "title": "...", "description": "...", "priority": "HIGH", "status": "PENDING", "dueDate": "YYYY-MM-DD" }` |
| `PUT` | `/tasks/:id` | Update task ticket | `{ "title": "...", "priority": "COMPLETED", ... }` |
| `DELETE` | `/tasks/:id` | Delete task ticket | Route param: `id` |

---

## Unit Testing

### Frontend Unit Tests
Runs using Vitest, JSDOM, and React Testing Library:
```bash
cd frontend
npm test
```
- Tests [`StatCard.test.tsx`](file:///c:/Users/pirij/Downloads/Project/Task_Management_System/frontend/src/test/StatCard.test.tsx): Metric rendering & colors.
- Tests [`TaskCard.test.tsx`](file:///c:/Users/pirij/Downloads/Project/Task_Management_System/frontend/src/test/TaskCard.test.tsx): Task information display & click event callbacks.
- Tests [`TaskTable.test.tsx`](file:///c:/Users/pirij/Downloads/Project/Task_Management_System/frontend/src/test/TaskTable.test.tsx): Row rendering & empty states.

### Backend Unit Tests
Runs using Jest & Supertest:
```bash
cd backend
npm test
```
- Tests [`api.test.ts`](file:///c:/Users/pirij/Downloads/Project/Task_Management_System/backend/src/test/api.test.ts): Middleware authentication enforcement and input validation.

---

## Assumptions Made
1. **Database Access**: A PostgreSQL instance is running locally or accessible via the database connection string specified in `DATABASE_URL`.
2. **User Roles**: Each task is scoped strictly to the authenticated user ID extracted from the JWT token.
3. **Session Token Scope**: JWT tokens are issued upon login and explicitly blacklisted in the `RevokedToken` table upon logout.

---

## Known Limitations
1. **OAuth Integration**: Currently relies on email/password authentication. Social logins (Google/GitHub OAuth) are not included.
2. **Real-time WebSockets**: Task statistics update on page navigation or refresh; WebSockets/Server-Sent Events (SSE) for live collaborative updates are not implemented in the current scope.
