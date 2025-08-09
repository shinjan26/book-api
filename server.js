// Import required modules
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory array to store books
let books = [
    { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 2, title: '1984', author: 'George Orwell' }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book by ID
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    books[bookIndex] = { id: parseInt(id), title, author };
    res.json(books[bookIndex]);
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});