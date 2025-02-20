const { pool } = require('../config/database');

class BookModel {
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM books');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(bookData) {
    const { title, description, genre, author } = bookData;
    const [result] = await pool.query(
      'INSERT INTO books (title, description, genre, author) VALUES (?, ?, ?, ?)',
      [title, description, genre, author]
    );
    return { id: result.insertId, ...bookData };
  }

  static async update(id, bookData) {
    const { title, description, genre, author } = bookData;
    const [result] = await pool.query(
      'UPDATE books SET title = ?, description = ?, genre = ?, author = ? WHERE id = ?',
      [title, description, genre, author, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = BookModel;