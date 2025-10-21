// validators/article-validator.js
const {body} = require('express-validator');

const articleValidator = {
    createArticle: [body('titre')
        .isLength({min: 1, max: 200})
        .withMessage('Le titre est requis et doit contenir entre 1 et 200 caractères')
        .trim()
        .escape(), body('hashtags')
        .isArray({min: 1})
        .withMessage('Les hashtags doivent être un array non vide')
        .custom((value) => {
            if (!value.every(hashtag => typeof hashtag === 'string' && hashtag.length <= 50)) {
                throw new Error('Chaque hashtag doit être une chaîne de max 50 caractères');
            }
            return true;
        }), body('description')
        .isLength({min: 1, max: 5000})
        .withMessage('La description est requise et doit contenir entre 1 et 5000 caractères')
        .trim(), body('image')
        .optional()
        .isURL()
        .withMessage('L\'image doit être une URL valide')
        .custom((value) => {
            if (value && !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i.test(value)) {
                throw new Error('L\'image doit pointer vers un fichier image valide (png, jpg, jpeg, gif, webp)');
            }
            return true;
        }),],
};

module.exports = articleValidator;