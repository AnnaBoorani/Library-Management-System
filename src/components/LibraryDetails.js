import React, { useState, useEffect } from 'react';

const LibraryDetails = ({ details, onSave }) => {
    const [formData, setFormData] = useState(details);

    useEffect(() => {
        setFormData(details);
    }, [details]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        alert('Library details saved successfully!');
    };

    return (
        <section className="library-details">
            <h1><i className="fas fa-building"></i> Library Management System</h1>
            <form onSubmit={handleSubmit} className="details-form">
                <div className="form-group">
                    <label>Library Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter library name"
                    />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter library address"
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label>Contact:</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Enter contact info"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i> Save Library Details
                </button>
            </form>
        </section>
    );
};

export default LibraryDetails;
