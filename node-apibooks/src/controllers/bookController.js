const BookModel = require('../models/bookModel');

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = await BookModel.findAll();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getBookById(req, res) {
    try {
      const book = await BookModel.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createBook(req, res) {
    try {
      const book = await BookModel.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateBook(req, res) {
    try {
      const success = await BookModel.update(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.json({ id: req.params.id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteBook(req, res) {
    try {
      const success = await BookModel.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
      res.json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BookController; 