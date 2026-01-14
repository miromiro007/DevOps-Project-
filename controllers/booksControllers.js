const books = require("../data/data")

// Obtenir un livre par son ID
const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID invalide" });
    }
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(book);
}


// Obtenir les livres (filtré avec pagination)
const getBooks = (req, res) => {
    const { author, title, minPrice, maxPrice } = req.query;
    
    // Validation pagination
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 5));
    
    // Optimisation: filtrer en une seule itération
    const authors = author ? (Array.isArray(author) ? author : [author]) : null;
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;
    const searchTitle = title ? title.toLowerCase() : null;
    
    const result = books.filter(b => {
        // Filtre auteur
        if (authors && !authors.some(a => b.author.toLowerCase().includes(a.toLowerCase()))) {
            return false;
        }
        // Filtre titre
        if (searchTitle && !b.title.toLowerCase().includes(searchTitle)) {
            return false;
        }
        // Filtre prix
        if (min !== null && b.price < min) return false;
        if (max !== null && b.price > max) return false;
        
        return true;
    });
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedResult = result.slice(startIndex, startIndex + limit);
    
    res.json({
        total: result.length,
        page,
        limit,
        data: paginatedResult
    });
}

// Ajouter un livre
const addBook = (req, res) => {
    const { title, author, price, quantity } = req.body;
    
    // Validation
    if (!title || !author || price === undefined || quantity === undefined) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }
    if (price < 0 || quantity < 0) {
        return res.status(400).json({ message: "Prix et quantité doivent être positifs" });
    }
    
    // Générer ID plus robuste
    const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;
    const newBook = {
        id: maxId + 1,
        title,
        author,
        price: Number(price),
        quantity: Number(quantity)
    };
    
    books.push(newBook);
    res.status(201).json({ newBook, message: "Livre ajouté avec succès" });
}

// Vendre un livre
const sellBook = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID invalide" });
    }
    
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }
    if (book.quantity <= 0) {
        return res.status(400).json({ message: "Rupture de stock" });
    }
    
    book.quantity -= 1;
    res.json({ book, message: "Livre vendu avec succès" });
}


// Mettre à jour un livre
const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID invalide" });
    }
    
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }
    
    const { title, author, price, quantity } = req.body;
    
    // Validation
    if (price !== undefined && price < 0) {
        return res.status(400).json({ message: "Prix invalide" });
    }
    if (quantity !== undefined && quantity < 0) {
        return res.status(400).json({ message: "Quantité invalide" });
    }
    
    // Mise à jour seulement si fourni
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (price !== undefined) book.price = Number(price);
    if (quantity !== undefined) book.quantity = Number(quantity);
    
    res.json({ book, message: "Livre mis à jour avec succès" });
}


// Supprimer un livre
const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID invalide" });
    }
    
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: "Livre non trouvé" });
    }
    
    books.splice(bookIndex, 1);
    res.json({ message: "Livre supprimé avec succès" });
}



module.exports = { getBookById, getBooks, addBook, sellBook, updateBook , deleteBook }