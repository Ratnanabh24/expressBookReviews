const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
const public_users = express.Router();

// Task 10: Get all books using Async-Await
public_users.get('/', async function (req, res) {
    try {
        const response = await Promise.resolve(books);
        res.status(200).send(JSON.stringify(response, null, 4));
    } catch (error) {
        res.status(500).json({ message: "Error retrieving books" });
    }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const findBook = new Promise((resolve, reject) => {
        if (books[isbn]) resolve(books[isbn]);
        else reject("Book not found for this ISBN");
    });

    findBook
        .then(book => res.status(200).send(JSON.stringify(book, null, 4)))
        .catch(err => res.status(404).json({ message: err }));
});

// Task 12: Get book details based on author using Async-Await
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const filteredBooks = Object.values(books).filter(b => b.author === author);
        if (filteredBooks.length > 0) {
            res.status(200).send(JSON.stringify(filteredBooks, null, 4));
        } else {
            res.status(404).json({ message: "No books found for this author" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error searching by author" });
    }
});

// Task 13: Get book details based on title using Async-Await
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const filteredBooks = Object.values(books).filter(b => b.title === title);
        if (filteredBooks.length > 0) {
            res.status(200).send(JSON.stringify(filteredBooks, null, 4));
        } else {
            res.status(404).json({ message: "No books found for this title" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error searching by title" });
    }
});

// Task 6: Get book reviews based on ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
        res.status(404).json({ message: "No reviews found for this ISBN" });
    }
});

module.exports.general = public_users;
