import React, { useState } from 'react';
import '../../index.css';

const TaskForm = ({ onSubmit, isLoading = false, compact = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        status: 'Pending',
        tags: ''
    });

    const [errors, setErrors] = useState({});

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
        
        // Process tags
        const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        
        const taskToSubmit = {
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            dueDate: formData.dueDate,
            status: formData.status,
            tags: tags
        };
        
        onSubmit(taskToSubmit);
        
        // Reset form only if submission is successful
        // (The parent component should handle success/failure)
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

    if (compact) {
        return (
            <form onSubmit={handleSubmit} className="compact-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`form-control ${errors.title ? 'error' : ''}`}
                        placeholder="Add a new task..."
                        maxLength={100}
                    />
                    {errors.title && <div className="error-message">{errors.title}</div>}
                </div>
                
                <div className="form-group">
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className={`form-control ${errors.dueDate ? 'error' : ''}`}
                        min={getTodayDate()}
                    />
                    {errors.dueDate && <div className="error-message">{errors.dueDate}</div>}
                </div>
                
                <div className="priority-buttons compact">
                    {['Low', 'Medium', 'High'].map(priority => (
                        <button
                            key={priority}
                            type="button"
                            className={`priority-btn ${priority.toLowerCase()} ${formData.priority === priority ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, priority }))}
                        >
                            {priority}
                        </button>
                    ))}
                </div>
                
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
                <label htmlFor="title" className="required">
                    📝 Task Title
                </label>
                <input
                    type="text"
                    id="title"
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
                <label htmlFor="description">
                    📋 Description
                </label>
                <textarea
                    id="description"
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
                <label htmlFor="dueDate" className="required">
                    📅 Due Date
                </label>
                <input
                    type="date"
                    id="dueDate"
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
                <label htmlFor="tags">
                    🏷️ Tags (comma separated)
                </label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="work, urgent, personal"
                />
            </div>
            
            <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={!isFormValid || isLoading}
            >
                {isLoading ? (
                    <>
                        <span style={{ marginRight: '8px' }}>⏳</span>
                        Adding Task...
                    </>
                ) : (
                    <>
                        <span style={{ marginRight: '8px' }}>🚀</span>
                        Create Task
                    </>
                )}
            </button>
        </form>
    );
};

export default TaskForm;