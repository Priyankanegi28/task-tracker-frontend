import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>TaskMaster</h3>
                    <p>Your ultimate productivity companion for managing tasks efficiently.</p>
                </div>
                
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/tasks">Tasks</a></li>
                        <li><a href="/features">Features</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3>Contact</h3>
                    <ul className="footer-links">
                        <li>Email: support@taskmaster.com</li>
                        <li>Phone: (123) 456-7890</li>
                        <li>Address: 123 Task St, Productivity City</li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} TaskMaster Pro. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;