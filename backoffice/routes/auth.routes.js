const express = require('express');
const {validationResult} = require('express-validator');
const authController = require('../controllers/auth.controller');
const authValidator = require('../validators/auth-validator');

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};


router.post('/register', authValidator.register, validate, authController.register.bind(authController));
router.post('/login', authValidator.login, validate, authController.login.bind(authController));



module.exports = router;