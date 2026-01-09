import React from 'react';
import '../../index.css';

const FilterSort = ({ filters, onFilterChange, onSortChange }) => {
    return (
        <div className="filters-section">
            <h3>🔍 Filter & Sort</h3>
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="status">📊 Status</label>
                    <select
                        id="status"
                        className="form-control"
                        value={filters?.status || ''}
                        onChange={(e) => onFilterChange && onFilterChange('status', e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="Pending">⏳ Pending</option>
                        <option value="In Progress">⚡ In Progress</option>
                        <option value="Completed">✅ Completed</option>
                    </select>
                </div>
                
                <div className="filter-group">
                    <label htmlFor="priority">🎯 Priority</label>
                    <select
                        id="priority"
                        className="form-control"
                        value={filters?.priority || ''}
                        onChange={(e) => onFilterChange && onFilterChange('priority', e.target.value)}
                    >
                        <option value="">All Priorities</option>
                        <option value="High">🚨 High</option>
                        <option value="Medium">⚡ Medium</option>
                        <option value="Low">⬇️ Low</option>
                    </select>
                </div>
                
                <div className="filter-group">
                    <label htmlFor="sort">📈 Sort by</label>
                    <select
                        id="sort"
                        className="form-control"
                        onChange={(e) => onSortChange && onSortChange(e.target.value)}
                        defaultValue=""
                    >
                        <option value="">Default Order</option>
                        <option value="dueDate">📅 Due Date (Earliest)</option>
                        <option value="-dueDate">📅 Due Date (Latest)</option>
                        <option value="createdAt">🆕 Created (Newest)</option>
                        <option value="priority">🎯 Priority</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterSort;