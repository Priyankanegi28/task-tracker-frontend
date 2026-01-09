# TaskMaster - Task Management Application

## 📋 Project Overview

**TaskMaster Pro** is a sophisticated, full-stack task management application designed to help professionals and teams streamline their workflow, boost productivity, and achieve more with an intelligent task management system. The application features a beautiful, responsive interface with real-time task tracking, priority management, and detailed productivity analytics.

### 🎯 Live Demos
- **Frontend Application**: [https://task-tracckerr.netlify.app](https://task-tracckerr.netlify.app)
- **Backend API**: `https://task-tracker-backend-vtpb.onrender.com` 

## ✨ Key Features

### 🏆 Core Functionality
- **Task Management**: Create, read, update, and delete tasks with ease
- **Priority System**: Categorize tasks as High, Medium, or Low priority
- **Status Tracking**: Track tasks as Pending, In Progress, or Completed
- **Due Date Management**: Set and monitor task deadlines with overdue indicators
- **Real-time Updates**: Instant synchronization across all devices

### 📊 Smart Analytics
- Dashboard with comprehensive productivity overview
- Visual statistics for task completion rates
- Progress tracking with percentage indicators
- Overdue task monitoring and alerts

### 🎨 User Experience
- Modern, responsive design that works on all devices
- Intuitive drag-and-drop interface
- Filtering and sorting capabilities
- Clean, distraction-free task management environment

### 🔒 Security Features
- User authentication and authorization
- Secure data encryption
- Protected API endpoints
- Session management

## 🏗️ Project Architecture

### Frontend (React.js)
- **Framework**: React 18+
- **Routing**: React Router DOM
- **State Management**: React Hooks & Context API
- **Styling**: Custom CSS with modern design principles
- **HTTP Client**: Axios for API communication

### Backend (Node.js/Express.js)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **API Structure**: RESTful architecture

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB Atlas account or local MongoDB installation

### Backend Setup
1. **Clone the backend repository**
   ```bash
   git clone <backend-repository-url>
   cd task-tracker-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The backend will start at `http://localhost:5000`

### Frontend Setup
1. **Clone the frontend repository**
   ```bash
   git clone <frontend-repository-url>
   cd task-tracker-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update the API base URL in your configuration file:
   ```javascript
   // In services/api.js or similar configuration file
   const API_URL = 'http://localhost:5000/api'; // For local development
   // OR
   const API_URL = 'https://your-live-backend-url.com/api'; // For production
   ```

4. **Start the development server**
   ```bash
   npm start
   ```
   The frontend will open at `http://localhost:3000`

## 📁 Project Structure
```
EXPLORER
├── OPEN EDITORS
└── TASK-TRACKER
    ├── backend
    │   ├── middleware
    │   ├── models
    │   ├── node_modules
    │   ├── routes
    │   ├── .env
    │   ├── .gitignore
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── render.yaml
    │   └── server.js
    └── frontend
        ├── node_modules
        ├── public
        ├── src
        │   ├── components
        │   │   ├── Auth
        │   │   ├── Dashboard
        │   │   ├── Layout
        │   │   └── Tasks
        │   ├── context
        │   ├── pages
        │   ├── services
        │   ├── App.css
        │   ├── App.js
        │   ├── App.test.js
        │   ├── index.css
        │   ├── index.js
        │   ├── logo.svg
        │   ├── reportWebVitals.js
        │   └── setupTests.js
        ├── .env
        ├── .gitignore
        ├── netlfly.toml
        ├── package-lock.json
        └── package.json


## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

## 🛠️ Deployment

### Backend Deployment (Render.com)
1. Push your code to a Git repository
2. Create a new Web Service on Render
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables in the Render dashboard
7. Deploy the service

### Frontend Deployment (Netlify)
1. Push your code to a Git repository
2. Create a new site on Netlify
3. Connect your repository
4. Set build command: `npm run build`
5. Set publish directory: `build`
6. Add environment variables if needed
7. Deploy the site

## 🐛 Troubleshooting

### Common Issues

1. **Backend returns 404**
   - Verify your backend is running
   - Check if the correct port is being used
   - Ensure all environment variables are set

2. **Database connection issues**
   - Verify MongoDB connection string
   - Check network connectivity
   - Ensure database user has correct permissions

3. **CORS errors**
   - Ensure CORS is properly configured in the backend
   - Verify frontend is making requests to the correct origin

4. **Authentication problems**
   - Check JWT token expiration
   - Verify token is being sent in Authorization header
   - Ensure user exists in the database

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
