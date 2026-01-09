import React, { useEffect, useState } from 'react';
import '../../index.css';
import { taskAPI } from '../../services/api';
import EditTaskModal from './EditTaskModal';
import FilterSort from './FilterSort';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const params = { ...filters };
            if (sortBy) {
                params.sortBy = sortBy;
            }
            const response = await taskAPI.getTasks(params);
            const fetchedTasks = response.data.data || response.data || [];
            setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [filters, sortBy]);

    const handleTaskCreated = async (taskData) => {
        try {
            setLoading(true);
            const response = await taskAPI.createTask(taskData);
            if (response.data.success) {
                setTasks(prev => [response.data.data, ...prev]);
            }
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleTaskUpdated = async (id, updates) => {
        try {
            const response = await taskAPI.updateTask(id, updates);
            if (response.data.success) {
                setTasks(prev => prev.map(task => 
                    task._id === id ? { ...task, ...updates } : task
                ));
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleTaskDeleted = async (id) => {
        try {
            const response = await taskAPI.deleteTask(id);
            if (response.data.success) {
                setTasks(prev => prev.filter(task => task._id !== id));
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleTaskEdit = (task) => {
        setEditingTask(task);
        setIsEditing(true);
    };

    const handleEditSave = async (updatedTask) => {
        try {
            const { _id, ...updates } = updatedTask;
            const response = await taskAPI.updateTask(_id, updates);
            
            if (response.data.success) {
                setTasks(prev => prev.map(task => 
                    task._id === _id ? { ...task, ...updates } : task
                ));
                setIsEditing(false);
                setEditingTask(null);
            } else {
                alert('Failed to update task: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error saving edited task:', error);
            alert('Failed to update task: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setEditingTask(null);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value || undefined
        }));
    };

    const handleSortChange = (sortValue) => {
        setSortBy(sortValue);
    };

    return (
        <div className="task-manager">
            <div className="task-header">
                <h1>Task Management</h1>
                <p>Organize and manage all your tasks in one place</p>
            </div>
            
            <div className="task-content">
                <div className="task-sidebar">
                    <div className="sidebar-card">
                        <h3>Add New Task</h3>
                        <TaskForm onSubmit={handleTaskCreated} isLoading={loading} />
                    </div>
                </div>
                
                <div className="task-main">
                    <FilterSort
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onSortChange={handleSortChange}
                    />
                    <TaskList
                        tasks={tasks}
                        onUpdate={handleTaskUpdated}
                        onDelete={handleTaskDeleted}
                        onEdit={handleTaskEdit}
                        loading={loading}
                    />
                </div>
            </div>

            {/* Edit Task Modal */}
            {isEditing && editingTask && (
                <EditTaskModal
                    task={editingTask}
                    onSave={handleEditSave}
                    onCancel={handleEditCancel}
                />
            )}
        </div>
    );
};

export default TaskManager;