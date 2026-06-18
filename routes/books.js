const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// GET all books (with search and pagination)
router.get('/', async (req, res, next) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const query = {};
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    const skip = (page - 1) * limit;
    
    const books = await Book.find(query).skip(skip).limit(parseInt(limit));
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
});

// GET single book by ID
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    if (error.name === 'CastError') {
       return res.status(400).json({ error: 'Invalid book ID' });
    }
    next(error);
  }
});

// POST a new book
router.post('/', async (req, res, next) => {
  try {
    const { title, author, price } = req.body;
    if (!title || !author || price === undefined) {
      return res.status(400).json({ error: 'Title, author, and price are required' });
    }
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// PUT update an existing book
router.put('/:id', async (req, res, next) => {
  try {
    // Validate required fields
    const { title, author, price } = req.body;
    if (!title || !author || price === undefined) {
        return res.status(400).json({ error: 'Title, author, and price are required' });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    if (error.name === 'CastError') {
       return res.status(400).json({ error: 'Invalid book ID' });
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// DELETE a book by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
       return res.status(400).json({ error: 'Invalid book ID' });
    }
    next(error);
  }
});

module.exports = router;
