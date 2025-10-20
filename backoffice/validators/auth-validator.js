const { body } = require('express-validator');

const authValidator = {
  createAdmin: [
    body('username')
      .isLength({ min: 3, max: 50 })
      .withMessage('Le nom d’utilisateur doit contenir entre 3 et 50 caractères')
      .trim()
      .escape(),
    body('email').isEmail().withMessage('L’email doit être valide').normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
  ],
  register: [
    body('username')
      .isLength({ min: 3, max: 50 })
      .withMessage('Le nom d’utilisateur doit contenir entre 3 et 50 caractères')
      .trim()
      .escape(),
    body('email').isEmail().withMessage('L’email doit être valide').normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
  ],
  login: [
    body('email').isEmail().withMessage('L’email doit être valide').normalizeEmail(),
    body('password').notEmpty().withMessage('Le mot de passe est requis'),
  ],
  updateRole: [
    body('userId').isMongoId().withMessage('ID utilisateur invalide'),
    body('role')
      .isIn(['Admin', 'Éditeur', 'Rédacteur', 'Lecteur'])
      .withMessage('Rôle invalide'),
  ],
};

module.exports = authValidator;