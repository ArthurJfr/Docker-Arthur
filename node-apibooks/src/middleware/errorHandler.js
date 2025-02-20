const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue sur le serveur',
    message: err.message
  });
};

module.exports = errorHandler; 