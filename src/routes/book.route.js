// imports
const express = require('express');
const bookController = require('../controllers/book')


// constants
const router = express.Router();
router.get('/search', bookController.searchBooks);

// exports
module.exports = router;