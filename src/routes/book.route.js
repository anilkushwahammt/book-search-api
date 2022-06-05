const express = require('express');
const bookController = require('../controllers/book')


// router specific to book related operations handling
const bookRouter = express.Router();
bookRouter.get('/search', bookController.searchBooks);

// exports
module.exports = bookRouter;