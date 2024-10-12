const express = require('express');
const axios = require('axios');

const general = express.Router();

const books = [
    { isbn: '1', title: "Things Fall Apart", author: "Chinua Achebe" },
    { isbn: '2', title: "Fairy Tales", author: "Hans Christian Andersen" },
    { isbn: '3', title: "Pride and Prejudice", author: "Jane Austen" }
];

// Task 11: Fetching book details by ISBN
general.get('/books/:isbn', async (req, res) => {
    const { isbn } = req.params;

    try {
        const bookDetails = books.find(book => book.isbn === isbn);
        if (bookDetails) {
            res.status(200).json(bookDetails);
        } else {
            res.status(404).json({ message: "Book not found." });
        }
    } catch (error) {
        console.error("Error fetching book details:", error);
        res.status(500).json({ message: "Error fetching book details." });
    }
});

// Task 12: Fetching book details by Author
general.get('/books/author/:author', async (req, res) => {
    const { author } = req.params;

    try {
        const authorBooks = books.filter(book => book.author.toLowerCase() === author.toLowerCase());
        if (authorBooks.length > 0) {
            res.status(200).json(authorBooks);
        } else {
            res.status(404).json({ message: "No books found by this author." });
        }
    } catch (error) {
        console.error("Error fetching books by author:", error);
        res.status(500).json({ message: "Error fetching books by author." });
    }
});

// Task 13: Fetching book details by Title
general.get('/books/title/:title', async (req, res) => {
    const { title } = req.params;

    try {
        const titleBook = books.find(book => book.title.toLowerCase() === title.toLowerCase());
        if (titleBook) {
            res.status(200).json(titleBook);
        } else {
            res.status(404).json({ message: "Book not found." });
        }
    } catch (error) {
        console.error("Error fetching book details by title:", error);
        res.status(500).json({ message: "Error fetching book details by title." });
    }
});

module.exports.general = general;
