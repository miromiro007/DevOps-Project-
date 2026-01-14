const express = require('express');

const router = express.Router();

const { getBookById, getBooks, addBook , sellBook , updateBook ,deleteBook } = require('../controllers/booksControllers');

// Route pour obtenir tous les livres avec filtrage et pagination
router.get('/books', getBooks);

// Route pour obtenir un livre par son ID
router.get('/books/:id', getBookById);

// Route pour ajouter un nouveau livre
router.post('/books', addBook);

//Route port vendre un livre
router.post('/books/sell/:id', sellBook);

// route pour mettre à jour un livre
router.put('/books/:id', updateBook);

router.delete('/books/:id', deleteBook);



module.exports = router;