import React from 'react';

const StatsCard = ({ title, value, icon, color, percentage }) => {
    const colorClass = `stats-card ${color || 'primary'}`;
    
    return (
        <div className={colorClass}>
            <div className="stats-header">
                <span className="stats-icon">{icon || '📊'}</span>
                <h4 className="stats-title">{title || 'Statistic'}</h4>
            </div>
            <div className="stats-value">{value || 0}</div>
            {percentage !== undefined && (
                <div className="stats-percentage">
                    {percentage}% of total
                </div>
            )}
        </div>
    );
};

export default StatsCard;