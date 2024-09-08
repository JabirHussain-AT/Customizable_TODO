# Nested TodoList


## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

**Nested TodoList** is a customizable todo application that allows users to create a hierarchy of tasks with up to three levels: main tasks, sub-tasks, and sub of sub-tasks. The tasks can be organized using drag-and-drop and customization functionality, and progress is tracked based on completed sub-tasks.

This project is designed to efficiently handle task management with intuitive UI features such as progress tracking and dynamic task creation.

## Features

- **Nested Tasks**: Supports up to three levels of nested tasks (main, sub, sub of sub).
- **Drag-and-Drop**: Move tasks and sub-tasks between levels using `@dnd-kit`.
- **Sub-Task Management**: Add, edit, and delete sub-tasks with ease.
- **Progress Tracking**: Displays the progress of each main task based on the number of completed sub-tasks in percentage ( % )
- **Dynamic Task Creation**: Create new tasks at any level in the hierarchy.
- **Mobile Responsive**: Fully responsive design with support for mobile and desktop views.
- **Customization** : font style and font color customization
- **persisting** : Persisting across page reloads 

## Technology Stack

- **Frontend**: React, Vite
  - `react-icons`: For icons and task-related visuals
  - `react-iconpicker` For picking icons 
  - `@dnd-kit`: For drag-and-drop functionality
- **Deployment**: Vercel

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/JabirHussain-AT/Customizable_TODO.git
   cd client
   npm run build
   npm install
   npm run dev

## Usage
  - You can manage nested Todos
  - Various fonts for styling based on user preference
  - drag and drop for functionality for arrange the preference

## Dependencies
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "lucide-react": "^0.439.0",
    "react": "^18.3.1",
    "react-beautiful-dnd": "^13.1.1",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^4.4.0",
    "react-icons-picker": "^1.0.9",
    "react-router-dom": "^6.26.1",
    "uuid": "^10.0.0"
   
## Screenshots 
![image](https://github.com/user-attachments/assets/b1fe028b-3af4-4013-adac-b672587fbe54)
![image](https://github.com/user-attachments/assets/2137b1c2-5f4e-4b58-96c3-b9cd754e6838)
![image](https://github.com/user-attachments/assets/28576185-753e-4327-8c19-a0e427753d49)
![image](https://github.com/user-attachments/assets/d98e9ba4-c518-4862-ab7c-21eff50b3337)

## Contribution
 - open for contribution

## **Live Link** : https://nested-todo--eosin.vercel.app/




