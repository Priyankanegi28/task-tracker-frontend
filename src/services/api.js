import axios from 'axios';

// Determine API URL based on environment
const getApiUrl = () => {
    // Use Netlify environment variable if available
    if (process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
    }
    // Fallback for development
    return window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api' 
        : 'https://task-tracker-backend-vtpb.onrender.com/api';
};

const API_URL = getApiUrl();

console.log('API URL:', API_URL); // For debugging

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 second timeout
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response.config.url, response.status);
        return response;
    },
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message
        });

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        
        if (error.code === 'ECONNABORTED') {
            alert('Request timeout. Please check your connection or try again.');
        }
        
        return Promise.reject(error);
    }
);

// Health check function
export const checkBackendHealth = async () => {
    try {
        const backendUrl = API_URL.replace('/api', '/health');
        const response = await axios.get(backendUrl, { timeout: 5000 });
        return {
            status: 'healthy',
            data: response.data
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            error: error.message
        };
    }
};

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getMe: () => api.get('/auth/me'),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    }
};

// Task API
export const taskAPI = {
    getTasks: (params = {}) => {
        // Convert params to query string, filtering out undefined/null
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value);
            }
        });
        const queryString = queryParams.toString();
        return api.get(`/tasks${queryString ? `?${queryString}` : ''}`);
    },
    getTask: (id) => api.get(`/tasks/${id}`),
    getStats: () => api.get('/tasks/stats'),
    createTask: (taskData) => api.post('/tasks', taskData),
    updateTask: (id, taskData) => api.put(`/tasks/${id}`, taskData),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
};

// Test connection on app start
export const testConnection = async () => {
    try {
        const health = await checkBackendHealth();
        console.log('Backend health:', health);
        return health;
    } catch (error) {
        console.warn('Backend health check failed:', error);
        return { status: 'unreachable', error: error.message };
    }
};

export default api;