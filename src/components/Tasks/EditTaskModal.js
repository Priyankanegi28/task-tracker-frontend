import React, { useEffect, useState } from 'react';
import '../../index.css';

const EditTaskModal = ({ 
    task = null, 
    onSave = () => {}, 
    onCancel = () => {} 
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: 'Pending'
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (task) {
            let formattedDate = '';
            try {
                const dueDate = new Date(task.dueDate);
                if (!isNaN(dueDate.getTime())) {
                    formattedDate = dueDate.toISOString().split('T')[0];
                }
            } catch (error) {
                formattedDate = '';
            }
            
            setFormData({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || 'Medium',
                dueDate: formattedDate,
                status: task.status || 'Pending'
            });
        }
    }, [task]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length > 100) {
            newErrors.title = 'Title cannot exceed 100 characters';
        }
        
        if (formData.description.length > 500) {
            newErrors.description = 'Description cannot exceed 500 characters';
        }
        
        if (!formData.dueDate) {
            newErrors.dueDate = 'Due date is required';
        } else {
            const dueDate = new Date(formData.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);
            if (dueDate < today) {
                newErrors.dueDate = 'Due date cannot be in the past';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        if (!task || !task._id) {
            console.error('No task ID provided for editing');
            return;
        }
        
        onSave({
            _id: task._id,
            ...formData
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const isFormValid = formData.title.trim() && 
                       formData.description.length <= 500 && 
                       formData.dueDate;

    // Don't render modal if no task is selected
    if (!task) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2> Edit Task</h2>
                    <button className="close-btn" onClick={onCancel}>×</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="edit-title" className="required">
                            📝 Task Title
                        </label>
                        <input
                            type="text"
                            id="edit-title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`form-control ${errors.title ? 'error' : ''}`}
                            placeholder="What needs to be done?"
                            maxLength={100}
                        />
                        {errors.title && (
                            <div className="error-message">
                                ⚠️ {errors.title}
                            </div>
                        )}
                        <div className="char-count">
                            {formData.title.length}/100 characters
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="edit-description">
                            📋 Description
                        </label>
                        <textarea
                            id="edit-description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`form-control ${errors.description ? 'error' : ''}`}
                            placeholder="Add details about your task..."
                            rows="4"
                            maxLength={500}
                        />
                        {errors.description && (
                            <div className="error-message">
                                ⚠️ {errors.description}
                            </div>
                        )}
                        <div className="char-count">
                            {formData.description.length}/500 characters
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>🎯 Priority</label>
                        <div className="priority-buttons">
                            <button
                                type="button"
                                className={`priority-btn low ${formData.priority === 'Low' ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, priority: 'Low' }))}
                            >
                                <span className="priority-icon">⬇️</span>
                                <span>Low</span>
                            </button>
                            <button
                                type="button"
                                className={`priority-btn medium ${formData.priority === 'Medium' ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, priority: 'Medium' }))}
                            >
                                <span className="priority-icon">⚡</span>
                                <span>Medium</span>
                            </button>
                            <button
                                type="button"
                                className={`priority-btn high ${formData.priority === 'High' ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, priority: 'High' }))}
                            >
                                <span className="priority-icon">🚨</span>
                                <span>High</span>
                            </button>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="edit-dueDate" className="required">
                            📅 Due Date
                        </label>
                        <input
                            type="date"
                            id="edit-dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className={`form-control ${errors.dueDate ? 'error' : ''}`}
                            min={getTodayDate()}
                        />
                        {errors.dueDate && (
                            <div className="error-message">
                                ⚠️ {errors.dueDate}
                            </div>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label>📊 Status</label>
                        <div className="priority-buttons">
                            <button
                                type="button"
                                className={`priority-btn ${formData.status === 'Pending' ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, status: 'Pending' }))}
                                style={{ 
                                    color: formData.status === 'Pending' ? 'var(--warning)' : 'var(--secondary)',
                                    borderColor: formData.status === 'Pending' ? 'var(--warning)' : 'var(--border)'
                                }}
                            >
                                <span className="priority-icon">⏳</span>
                                <span>Pending</span>
                            </button>
                            <button
                                type="button"
                                className={`priority-btn ${formData.status === 'Completed' ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, status: 'Completed' }))}
                                style={{ 
                                    color: formData.status === 'Completed' ? 'var(--success)' : 'var(--secondary)',
                                    borderColor: formData.status === 'Completed' ? 'var(--success)' : 'var(--border)'
                                }}
                            >
                                <span className="priority-icon">✅</span>
                                <span>Completed</span>
                            </button>
                            <button
                                type="button"
                                className={`priority-btn ${formData.status === 'In Progress' ? 'active' : ''}`}
                                onClick={() => setFormData(prev => ({ ...prev, status: 'In Progress' }))}
                                style={{ 
                                    color: formData.status === 'In Progress' ? 'var(--info)' : 'var(--secondary)',
                                    borderColor: formData.status === 'In Progress' ? 'var(--info)' : 'var(--border)'
                                }}
                            >
                                <span className="priority-icon">⚡</span>
                                <span>In Progress</span>
                            </button>
                        </div>
                    </div>
                    
                    <div className="button-group">
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={!isFormValid}
                        >
                            <span style={{ marginRight: '8px' }}>💾</span>
                            Save Changes
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;