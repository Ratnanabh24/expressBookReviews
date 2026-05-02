const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

public_users.get('/', function (req, res) {
  res.status(200).send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).send(JSON.stringify(books[isbn], null, 4));
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let filtered_books = Object.values(books).filter(book => book.author === author);
  res.status(200).send(JSON.stringify(filtered_books, null, 4));
});

public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let filtered_books = Object.values(books).filter(book => book.title === title);
  res.status(200).send(JSON.stringify(filtered_books, null, 4));
});

// Task 6: Get book reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
