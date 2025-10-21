const Article = require('../models/article_model');
const AppError = require('../utils/error/app_error');

class ArticleController {
    async createArticle(req, res) {
        const {titre, hashtags, description, image} = req.body;
        const authorId = req.user?.id;

        this._validateAuth(authorId);
        this._validateArticleInput({titre, hashtags, description, image});

        const article = new Article({
            titre, hashtags, description, image: image || null, authorId, status: 'published',
        });

        const savedArticle = await article.save();
        const populatedArticle = await Article.findById(savedArticle._id).populate('authorId', 'username role');
        res.status(201).json({
            message: 'Article créé avec succès', article: populatedArticle,
        });
    }
    async getArticlesByProfileId(req, res) {
        const { profileId } = req.params;
        const { status } = req.query;

        if (!profileId) {
            throw new AppError('ID de profil manquant', 400);
        }

        const filter = { authorId: profileId };
        if (status) {
            filter.status = status;
        }

        const articles = await Article.find(filter)
            .populate('authorId', 'username role')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: `Articles du profil ${profileId}`,
            articles,
            count: articles.length
        });
    }

    async getArticleById(req, res) {
        const { id } = req.params;

        if (!id) {
            throw new AppError('ID d\'article manquant', 400);
        }

        const article = await Article.findById(id)
            .populate('authorId', 'username role');

        if (!article) {
            throw new AppError('Article non trouvé', 404);
        }

        res.status(200).json({
            message: 'Article récupéré avec succès',
            article
        });
    }

    async getAllArticles(req, res) {
        const articles = await Article.find({status: 'published'})
            .populate('authorId', 'username role')
            .sort({createdAt: -1});
        res.status(200).json(articles);
    }

    _validateAuth(authorId) {
        if (!authorId) {
            throw new AppError('Utilisateur non authentifié – connexion requise pour créer un article', 401);
        }
    }

    _validateArticleInput({titre, hashtags, description, image}) {
        if (!titre || !description || !hashtags || !Array.isArray(hashtags)) {
            throw new AppError('Champs requis manquants : titre, hashtags (array), description', 400);
        }
        if (image && !this._isValidImageUrl(image)) {
            throw new AppError('URL d\'image invalide', 400);
        }
    }

    _isValidImageUrl(url) {
        const imageRegex = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i;
        return imageRegex.test(url);
    }
}

module.exports = new ArticleController();