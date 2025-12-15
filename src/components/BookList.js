import React from 'react';

const BookList = ({ books, onDelete, onEdit }) => {
    if (books.length === 0) {
        return (
            <div className="no-books">
                <i className="fas fa-book-open"></i>
                <p>No books found. Add your first book!</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                <span className={`genre-badge genre-${book.genre.toLowerCase()}`}>
                                    {book.genre}
                                </span>
                            </td>
                            <td>{book.year}</td>
                            <td className="action-buttons">
                                <button
                                    onClick={() => onEdit(book)}
                                    className="btn btn-warning btn-small"
                                    title="Edit"
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    onClick={() => onDelete(book.id)}
                                    className="btn btn-danger btn-small"
                                    title="Delete"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
