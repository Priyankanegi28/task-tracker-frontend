import React, { useEffect, useState } from 'react';
import '../../index.css';
import { taskAPI } from '../../services/api';
import EditTaskModal from '../Tasks/EditTaskModal'; // Import EditTaskModal
import FilterSort from '../Tasks/FilterSort';
import TaskForm from '../Tasks/TaskForm';
import TaskList from '../Tasks/TaskList';
import RecentTasks from './RecentTasks';
import StatsCard from './StatsCard';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
        inProgress: 0,
        overdue: 0,
        highPriority: 0
    });
    const [tasks, setTasks] = useState([]);
    const [recentTasks, setRecentTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [, setSortBy] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [tasksRes] = await Promise.all([
                taskAPI.getTasks({ sortBy: 'createdAt' })
            ]);
            
            const fetchedTasks = tasksRes.data.data || [];
            setTasks(fetchedTasks);
            calculateStats(fetchedTasks);
            setRecentTasks(fetchedTasks.slice(0, 5));
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            setTasks([]);
            setRecentTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (taskArray) => {
        const total = taskArray.length;
        const completed = taskArray.filter(task => task.status === 'Completed').length;
        const pending = taskArray.filter(task => task.status === 'Pending').length;
        const inProgress = taskArray.filter(task => task.status === 'In Progress').length;
        const highPriority = taskArray.filter(task => task.priority === 'High').length;
        
        const overdue = taskArray.filter(task => {
            try {
                if (!task.dueDate || task.status === 'Completed') return false;
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                return dueDate < today;
            } catch (error) {
                return false;
            }
        }).length;
        
        setStats({
            total,
            completed,
            pending,
            inProgress,
            overdue,
            highPriority
        });
    };

    const handleTaskCreated = () => {
        fetchDashboardData();
    };

    const handleTaskUpdated = async (id, updates) => {
        try {
            await taskAPI.updateTask(id, updates);
            fetchDashboardData();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleTaskDeleted = async (id) => {
        try {
            await taskAPI.deleteTask(id);
            fetchDashboardData();
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
                // Update the task in local state
                setTasks(prev => prev.map(task => 
                    task._id === _id ? { ...task, ...updates } : task
                ));
                setRecentTasks(prev => prev.map(task => 
                    task._id === _id ? { ...task, ...updates } : task
                ));
                setIsEditing(false);
                setEditingTask(null);
                fetchDashboardData(); // Refresh stats
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
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back! Here's your productivity overview</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <StatsCard
                    title="Total Tasks"
                    value={stats.total}
                    icon="📋"
                    color="primary"
                />
                <StatsCard
                    title="Completed"
                    value={stats.completed}
                    icon="✅"
                    color="success"
                    percentage={stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}
                />
                <StatsCard
                    title="In Progress"
                    value={stats.inProgress}
                    icon="⚡"
                    color="warning"
                />
                <StatsCard
                    title="Overdue"
                    value={stats.overdue}
                    icon="🚨"
                    color="danger"
                />
            </div>

            {/* Quick Add Task & Recent Tasks */}
            <div className="dashboard-content">
                <div className="dashboard-column">
                    <div className="dashboard-card">
                        <h3>Quick Add Task</h3>
                        <TaskForm onSubmit={handleTaskCreated} compact={true} />
                    </div>
                    
                    <div className="dashboard-card">
                        <h3>Recent Tasks</h3>
                        <RecentTasks tasks={recentTasks} loading={loading} />
                    </div>
                </div>

                {/* Full Task Management */}
                <div className="dashboard-column">
                    <div className="dashboard-card">
                        <h3>Task Management</h3>
                        <FilterSort
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onSortChange={handleSortChange}
                        />
                        <TaskList
                            tasks={tasks}
                            onUpdate={handleTaskUpdated}
                            onDelete={handleTaskDeleted}
                            onEdit={handleTaskEdit} // Now this will trigger the modal
                            loading={loading}
                        />
                    </div>
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

export default Dashboard;