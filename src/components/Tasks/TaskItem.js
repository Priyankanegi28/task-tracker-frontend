import React from 'react';
import '../../index.css';
const TaskItem = ({ task, onUpdate, onDelete, onEdit }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'No date';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    const isPastDue = (dateString) => {
        if (!dateString) return false;
        try {
            const dueDate = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate < today && task.status !== 'Completed';
        } catch (error) {
            return false;
        }
    };

    const daysUntilDue = (dateString) => {
        if (!dateString) return 0;
        try {
            const dueDate = new Date(dateString);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);
            const diffTime = dueDate.getTime() - today.getTime();
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        } catch (error) {
            return 0;
        }
    };

    const isOverdue = isPastDue(task.dueDate);
    const daysUntil = daysUntilDue(task.dueDate);
    
    const getDueDateLabel = () => {
        if (task.status === 'Completed') return 'Completed';
        if (isOverdue) return 'Overdue';
        if (daysUntil === 0) return 'Due Today';
        if (daysUntil === 1) return 'Due Tomorrow';
        if (daysUntil < 7) return `Due in ${daysUntil} days`;
        return `Due ${formatDate(task.dueDate)}`;
    };
    
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'High': return '🚨';
            case 'Medium': return '⚡';
            case 'Low': return '⬇️';
            default: return '📝';
        }
    };
    
    const getStatusIcon = (status) => {
        return status === 'Completed' ? '✅' : '⏳';
    };
    
    const handleStatusToggle = () => {
        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        onUpdate(task._id, { status: newStatus });
    };
    
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(task._id);
        }
    };
    
    const handleEdit = () => {
        onEdit(task);
    };
    
    return (
        <div className={`task-item ${(task.priority || 'Medium').toLowerCase()} ${(task.status || 'Pending').toLowerCase()}`}>
            <div className="task-header">
                <div style={{ flex: 1 }}>
                    <h3 className="task-title">{task.title || 'Untitled Task'}</h3>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                        <span className={`priority-badge ${(task.priority || 'Medium').toLowerCase()}`}>
                            {getPriorityIcon(task.priority || 'Medium')} {task.priority || 'Medium'}
                        </span>
                        <span className={`status-badge ${(task.status || 'Pending').toLowerCase()}`}>
                            {getStatusIcon(task.status || 'Pending')} {task.status || 'Pending'}
                        </span>
                        <span className={`task-due ${isOverdue ? 'overdue' : ''}`}>
                            📅 {getDueDateLabel()}
                        </span>
                    </div>
                </div>
            </div>
            
            {task.description && (
                <p className="task-description">{task.description}</p>
            )}
            
            <div className="task-meta">
                <div>
                    <div style={{ fontSize: '0.85rem', color: '#95a5a6', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span>📅 Due: {formatDate(task.dueDate)}</span>
                        <span style={{ opacity: 0.5 }}>•</span>
                        <span>📝 Created: {formatDate(task.createdAt)}</span>
                    </div>
                </div>
                
                <div className="task-actions">
                    <button
                        onClick={handleEdit}
                        className="action-btn edit-btn"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={handleStatusToggle}
                        className={`action-btn ${task.status === 'Pending' ? 'complete-btn' : 'incomplete-btn'}`}
                    >
                        {task.status === 'Pending' ? (
                            <>✅ Complete</>
                        ) : (
                            <>↩️ Pending</>
                        )}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="action-btn delete-btn"
                    >
                        🗑️ Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;