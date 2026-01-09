import React from 'react';

const Features = () => {
    const features = [
        {
            icon: '📊',
            title: 'Smart Analytics',
            description: 'Track your productivity with detailed insights and performance metrics.'
        },
        {
            icon: '🔄',
            title: 'Real-time Sync',
            description: 'Access your tasks from any device with instant synchronization.'
        },
        {
            icon: '🎯',
            title: 'Priority Management',
            description: 'Focus on what matters most with intelligent priority sorting.'
        },
        {
            icon: '🔒',
            title: 'Secure & Private',
            description: 'Your data is encrypted and secure with enterprise-grade protection.'
        },
        {
            icon: '📱',
            title: 'Mobile Responsive',
            description: 'Works perfectly on desktop, tablet, and mobile devices.'
        },
        {
            icon: '⚡',
            title: 'Fast Performance',
            description: 'Lightning-fast interface with optimized database queries.'
        }
    ];
    
    return (
        <div className="page features-page">
            <div className="container">
                <h1>Features</h1>
                <p className="page-subtitle">Everything you need to master your productivity</p>
                
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
                
                <div className="cta-section">
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of professionals boosting their productivity</p>
                    <a href="/register" className="btn btn-primary btn-lg">
                        Start Free Trial
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Features;