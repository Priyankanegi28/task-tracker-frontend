import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            TaskMaster Pro
                            <span className="hero-subtitle">Your Ultimate Productivity Companion</span>
                        </h1>
                        <p className="hero-description">
                            Streamline your workflow, boost productivity, and achieve more with our 
                            intelligent task management system. Designed for professionals who value 
                            efficiency and organization.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Get Started Free
                            </Link>
                            <Link to="/features" className="btn btn-outline btn-lg">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose TaskMaster Pro?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Smart Analytics</h3>
                            <p>Track your productivity with detailed insights and performance metrics.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3>Real-time Sync</h3>
                            <p>Access your tasks from any device with instant synchronization.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Priority Management</h3>
                            <p>Focus on what matters most with intelligent priority sorting.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure & Private</h3>
                            <p>Your data is encrypted and secure with enterprise-grade protection.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="works-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Sign Up</h3>
                            <p>Create your free account in seconds</p>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Add Tasks</h3>
                            <p>Organize your work with smart task creation</p>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>Track Progress</h3>
                            <p>Monitor your productivity with analytics</p>
                        </div>
                        <div className="step">
                            <div className="step-number">4</div>
                            <h3>Achieve More</h3>
                            <p>Complete tasks faster and boost productivity</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Boost Your Productivity?</h2>
                        <p>Join thousands of professionals who trust TaskMaster Pro</p>
                        <Link to="/register" className="btn btn-primary btn-xl">
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;