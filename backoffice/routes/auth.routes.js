const express = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');

const router = express.Router();

// Middleware pour valider les données et gérer les erreurs
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware pour vérifier le rôle Admin
const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'secret');
    if (decoded.role !== 'Admin') {
      return res.status(403).json({ error: 'Accès réservé aux administrateurs' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

// Routes
router.post('/create-admin', authValidator.createAdmin, validate, authController.createAdmin.bind(authController));
router.post('/register', authValidator.register, validate, authController.register.bind(authController));
router.post('/login', authValidator.login, validate, authController.login.bind(authController));
router.patch('/update-role', checkAdmin, authValidator.updateRole, validate, authController.updateRole.bind(authController));

module.exports = router;