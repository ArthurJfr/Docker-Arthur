const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;
// Creation d'un livre
// Recuperation des livres
// Modification d'un livre
// Suppression d'un livre
//filtrage par genre ou categorie
//recherche par titre ou auteur
//liste des livres
// faire un README
// Configuration CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
// Configuration de la base de données
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'booksdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Vérification de la connexion à la base de données
const checkDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion à la base de données établie');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error.message);
    return false;
  }
};

// Routes


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes pour les livres
// Récupérer tous les livres
app.get('/api/books', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM books');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer un livre par son ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Créer un nouveau livre
app.post('/api/books', async (req, res) => {
  try {
    const { title, description, genre, author } = req.body;
    const [result] = await pool.query(
      'INSERT INTO books (title, description, genre, author) VALUES (?, ?, ?, ?)',
      [title, description, genre, author]
    );
    res.status(201).json({ 
      id: result.insertId,
      title,
      description,
      genre,
      author
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mettre à jour un livre
app.put('/api/books/:id', async (req, res) => {
  try {
    const { title, description, genre, author } = req.body;
    const [result] = await pool.query(
      'UPDATE books SET title = ?, description = ?, genre = ?, author = ? WHERE id = ?',
      [title, description, genre, author, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
    res.json({ id: req.params.id, title, description, genre, author });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un livre
app.delete('/api/books/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM books WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }
    res.json({ message: 'Livre supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Démarrage du serveur après vérification de la base de données
const startServer = async () => {
  const dbConnected = await checkDatabaseConnection();
  if (dbConnected) {
    app.listen(port, () => {
      console.log(`🚀 Serveur démarré sur le port ${port}`);
    });
  } else {
    console.error('❌ Impossible de démarrer le serveur : pas de connexion à la base de données');
    process.exit(1);
  }
};

startServer(); 