import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import LibraryDetails from './components/LibraryDetails';
import './App.css';

function App() {
    const [books, setBooks] = useState([]);
    const [nextId, setNextId] = useState(1);
    const [editingBook, setEditingBook] = useState(null);
    const [filter, setFilter] = useState({ search: '', genre: '', sortBy: 'title' });
    const [libraryDetails, setLibraryDetails] = useState({
        name: '',
        address: '',
        contact: ''
    });

    // Load data from LocalStorage on mount
    useEffect(() => {
        const savedBooks = localStorage.getItem('books');
        const savedNextId = localStorage.getItem('nextId');
        const savedLibrary = localStorage.getItem('libraryDetails');
        
        if (savedBooks) setBooks(JSON.parse(savedBooks));
        if (savedNextId) setNextId(parseInt(savedNextId));
        if (savedLibrary) setLibraryDetails(JSON.parse(savedLibrary));
    }, []);

    // Save books to LocalStorage
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books));
        localStorage.setItem('nextId', nextId.toString());
    }, [books, nextId]);

    // Save library details
    const saveLibraryDetails = (details) => {
        setLibraryDetails(details);
        localStorage.setItem('libraryDetails', JSON.stringify(details));
    };

    // Add or update book
    const handleSaveBook = (bookData) => {
        if (editingBook) {
            // Update existing book
            setBooks(books.map(book => 
                book.id === editingBook.id 
                    ? { ...bookData, id: editingBook.id }
                    : book
            ));
            setEditingBook(null);
        } else {
            // Add new book
            const newBook = { ...bookData, id: nextId };
            setBooks([...books, newBook]);
            setNextId(nextId + 1);
        }
    };

    // Delete book
    const handleDeleteBook = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            setBooks(books.filter(book => book.id !== id));
        }
    };

    // Edit book
    const handleEditBook = (book) => {
        setEditingBook(book);
    };

    // Filter and sort books
    const filteredBooks = books
        .filter(book => 
            book.title.toLowerCase().includes(filter.search.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.search.toLowerCase()) ||
            book.genre.toLowerCase().includes(filter.search.toLowerCase())
        )
        .filter(book => !filter.genre || book.genre === filter.genre)
        .sort((a, b) => {
            if (filter.sortBy === 'title') return a.title.localeCompare(b.title);
            if (filter.sortBy === 'author') return a.author.localeCompare(b.author);
            if (filter.sortBy === 'year') return a.year - b.year;
            if (filter.sortBy === 'genre') return a.genre.localeCompare(b.genre);
            return 0;
        });

    return (
        <div className="App">
            <LibraryDetails 
                details={libraryDetails}
                onSave={saveLibraryDetails}
            />
            <div className="book-management">
                <h2><i className="fas fa-book"></i> Book Management</h2>
                <BookForm 
                    onSave={handleSaveBook}
                    editingBook={editingBook}
                    onCancel={() => setEditingBook(null)}
                />
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Search by title, author, or genre..."
                        value={filter.search}
                        onChange={(e) => setFilter({...filter, search: e.target.value})}
                    />
                    <select 
                        value={filter.genre}
                        onChange={(e) => setFilter({...filter, genre: e.target.value})}
                    >
                        <option value="">All Genres</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science">Science</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                    <select 
                        value={filter.sortBy}
                        onChange={(e) => setFilter({...filter, sortBy: e.target.value})}
                    >
                        <option value="title">Sort by Title</option>
                        <option value="author">Sort by Author</option>
                        <option value="year">Sort by Year</option>
                        <option value="genre">Sort by Genre</option>
                    </select>
                </div>
                <BookList 
                    books={filteredBooks}
                    onDelete={handleDeleteBook}
                    onEdit={handleEditBook}
                />
            </div>
        </div>
    );
}

export default App;

