const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'booksdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

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

module.exports = { pool, checkDatabaseConnection };
