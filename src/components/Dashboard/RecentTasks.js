import React from 'react';
import { Link } from 'react-router-dom';

const RecentTasks = ({ tasks, loading }) => {
    // Ensure tasks is always an array
    const taskList = Array.isArray(tasks) ? tasks : [];
    
    if (loading) {
        return <div className="loading">Loading recent tasks...</div>;
    }
    
    if (taskList.length === 0) {
        return (
            <div className="empty-state">
                <p>No recent tasks</p>
                <Link to="/tasks" className="btn btn-primary btn-sm">
                    Create your first task
                </Link>
            </div>
        );
    }
    
    return (
        <div className="recent-tasks">
            {taskList.slice(0, 5).map(task => (
                <div key={task._id || Math.random()} className="recent-task-item">
                    <div className="task-info">
                        <span className={`priority-dot ${task.priority?.toLowerCase() || 'medium'}`}></span>
                        <span className="task-title">{task.title || 'Untitled Task'}</span>
                    </div>
                    <div className="task-status">
                        <span className={`status-badge ${task.status?.toLowerCase() || 'pending'}`}>
                            {task.status || 'Pending'}
                        </span>
                    </div>
                </div>
            ))}
            <div className="view-all">
                <Link to="/tasks" className="view-all-link">
                    View all tasks →
                </Link>
            </div>
        </div>
    );
};

export default RecentTasks;