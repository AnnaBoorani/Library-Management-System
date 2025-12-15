import React, { useState, useEffect } from 'react';

const BookForm = ({ onSave, editingBook, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        year: ''
    });

    useEffect(() => {
        if (editingBook) {
            setFormData({
                title: editingBook.title,
                author: editingBook.author,
                genre: editingBook.genre,
                year: editingBook.year
            });
        } else {
            setFormData({ title: '', author: '', genre: '', year: '' });
        }
    }, [editingBook]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="book-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Genre:</label>
                        <select
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Genre</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Science">Science</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                            <option value="Fantasy">Fantasy</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            min="1800"
                            max="2025"
                            required
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-success">
                        {editingBook ? (
                            <>
                                <i className="fas fa-edit"></i> Update Book
                            </>
                        ) : (
                            <>
                                <i className="fas fa-plus"></i> Add Book
                            </>
                        )}
                    </button>
                    {(editingBook || formData.title) && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            <i className="fas fa-times"></i> Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BookForm;
