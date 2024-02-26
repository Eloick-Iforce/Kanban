# Kanban Board - React App

This project is a React application that implements a Kanban board for task management.

### Features:

- Three Kanban columns: **To Do**, **In Progress**, and **Done**.
- Drag and drop functionality to move tasks between columns.
- Add new tasks to any column.
- Delete tasks by dragging them to the "Burn Barrel" column.
- Dynamic counters display the number of tasks in each column.
- Animated task transitions using Framer Motion.

### Installation:

1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Run `npm run dev` to start the development server.

### Usage:

The application runs in the browser at `http://localhost:5173/`. You can:

- **Create new tasks:** Click the "Add Task" button in any column. Enter the task title and click "Add" or press Enter.
- **Move tasks:** Drag and drop tasks between columns to change their status.
- **Delete tasks:** Drag a task to the "Burn Barrel" column at the end.
- **Expand Add Task:** Click the "Add Task" button again to collapse the form.

### Dependencies:

- React
- Framer Motion
- React-icons (for Font Awesome and Feather icons)
- Tailwind CSS
