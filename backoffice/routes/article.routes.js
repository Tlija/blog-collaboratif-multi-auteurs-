const express = require('express');
const {validationResult} = require('express-validator');
const articleController = require('../controllers/article.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};

// Routes
router.post('/articles', authMiddleware, validate, articleController.createArticle.bind(articleController));
router.get('/articles', articleController.getAllArticles.bind(articleController));
router.get('/articles/:profileId',  articleController.getArticlesByProfileId.bind(articleController));
router.get('/articles/:id',  articleController.getArticleById.bind(articleController));
module.exports = router;