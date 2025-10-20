const errorHandler = (err, req, res, next) => {
  console.error( 'error serveur:', err.stack);
  res.status(500).json({ error: 'Une erreur est survenue sur le serveur' });
};

module.exports = errorHandler;