import React from 'react';

const About = () => {
    return (
        <div className="page about-page">
            <div className="container">
                <h1>About TaskMaster</h1>
                <div className="about-content">
                    <section className="about-section">
                        <h2>Our Mission</h2>
                        <p>
                            TaskMaster was born from a simple idea: productivity tools should be powerful yet simple, 
                            feature-rich yet intuitive. We believe that managing tasks shouldn't be a task in itself.
                        </p>
                    </section>
                    
                    <section className="about-section">
                        <h2>What We Offer</h2>
                        <ul className="features-list">
                            <li>🔐 Secure user authentication and data protection</li>
                            <li>📊 Comprehensive task analytics and insights</li>
                            <li>🔄 Real-time synchronization across devices</li>
                            <li>🎯 Smart priority and deadline management</li>
                            <li>📱 Responsive design for all screen sizes</li>
                        </ul>
                    </section>
                    
                    <section className="about-section">
                        <h2>Our Team</h2>
                        <p>
                            We're a team of passionate developers dedicated to creating tools that help people 
                            achieve more with less stress. We combine cutting-edge technology with user-centered 
                            design to deliver exceptional experiences.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;