import React from 'react';
import '../../index.css';
import TaskItem from './TaskItem';

const TaskList = ({ 
    tasks = [], 
    onUpdate = () => {}, 
    onDelete = () => {}, 
    onEdit = () => {}, 
    loading = false 
}) => {
    // Ensure tasks is always an array (already handled by default parameter)
    const taskList = Array.isArray(tasks) ? tasks : [];
    
    if (loading) {
        return (
            <div className="task-list-container">
                <h2>📋 Your Tasks</h2>
                <div className="loading">Loading tasks...</div>
            </div>
        );
    }
    
    if (taskList.length === 0) {
        return (
            <div className="task-list-container">
                <h2>📋 Your Tasks</h2>
                <div className="no-tasks">
                    <div className="empty-state-icon">📝</div>
                    <h3>No tasks found</h3>
                    <p>Start by adding your first task using the form on the left</p>
                    <p style={{ marginTop: '12px', opacity: 0.7, fontSize: '0.95rem' }}>
                        All tasks you create will appear here
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="task-list-container">
            <h2>📋 Your Tasks ({taskList.length})</h2>
            <div className="task-list">
                {taskList.map(task => (
                    <TaskItem
                        key={task._id || task.id || Math.random()}
                        task={task}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onEdit={onEdit}  // Make sure this is passed
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;