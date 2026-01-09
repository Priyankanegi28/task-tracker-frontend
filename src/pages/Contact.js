import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    return (
        <div className="page contact-page">
            <div className="container">
                <h1>Contact Us</h1>
                <div className="contact-content">
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <p>Have questions or feedback? We'd love to hear from you!</p>
                        
                        <div className="contact-details">
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <div>
                                    <h3>Email</h3>
                                    <p>support@taskmaster.com</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <div>
                                    <h3>Phone</h3>
                                    <p>(123) 456-7890</p>
                                </div>
                            </div>
                            
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <div>
                                    <h3>Address</h3>
                                    <p>123 Task Street, Productivity City, PC 12345</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="form-control"
                            />
                        </div>
                        
                        <button type="submit" className="btn btn-primary">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;