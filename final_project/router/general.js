const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Task 10: Get all books using Async-Await
public_users.get('/', async function (req, res) {
  const get_books = () => {
    return new Promise((resolve) => {
      resolve(books);
    });
  };
  const allBooks = await get_books();
  res.status(200).send(JSON.stringify(allBooks, null, 4));
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
    if (books[isbn]) resolve(books[isbn]);
    else reject("Book not found");
  })
  .then(book => res.status(200).send(JSON.stringify(book, null, 4)))
  .catch(err => res.status(404).json({message: err}));
});

// Task 12: Get book details based on author using Promises
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  new Promise((resolve) => {
    let filtered = Object.values(books).filter(b => b.author === author);
    resolve(filtered);
  })
  .then(filtered => res.status(200).send(JSON.stringify(filtered, null, 4)));
});

// Task 13: Get book details based on title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  new Promise((resolve) => {
    let filtered = Object.values(books).filter(b => b.title === title);
    resolve(filtered);
  })
  .then(filtered => res.status(200).send(JSON.stringify(filtered, null, 4)));
});

module.exports.general = public_users;
