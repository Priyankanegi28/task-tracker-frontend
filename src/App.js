import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';

// Pages
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Home from './pages/Home';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Dashboard
import Dashboard from './components/Dashboard/Dashboard';

// Task Manager
import TaskManager from './components/Tasks/TaskManager';

// Import existing components

import './index.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Header />
                    
                    <main className="main-content">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/features" element={<Features />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            {/* Protected Routes */}
                            <Route path="/dashboard" element={
                                <PrivateRoute>
                                    <div className="page-content">
                                        <Dashboard />
                                    </div>
                                </PrivateRoute>
                            } />
                            
                            <Route path="/tasks" element={
                                <PrivateRoute>
                                    <div className="grid-content">
                                        <TaskManager />
                                    </div>
                                </PrivateRoute>
                            } />
                            
                            {/* Redirect */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                    
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;