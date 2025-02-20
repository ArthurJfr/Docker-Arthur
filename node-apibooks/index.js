const app = require('./src/app');
const { checkDatabaseConnection } = require('./src/config/database');
const port = 3000;

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