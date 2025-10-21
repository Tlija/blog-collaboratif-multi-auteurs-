const mongoose = require('mongoose');

const ARTICLE_STATUS = {
    PUBLISHED: 'published', DRAFT: 'draft', ARCHIVED: 'archived',
};

const articleSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true,
        maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères'],
    }, hashtags: [{
        type: String, trim: true, maxlength: [50, 'Un hashtag ne peut pas dépasser 50 caractères'],
    }], description: {
        type: String,
        required: [true, 'La description est requise'],
        trim: true,
        maxlength: [5000, 'La description ne peut pas dépasser 5000 caractères'],
    }, image: {
        type: String,
        trim: true,
        default: null,
        match: [/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/, 'L\'image doit être une URL valide vers un fichier image'],  // Optionnel : Validation URL image
    }, authorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,
    }, status: {
        type: String, enum: ARTICLE_STATUS, default: ARTICLE_STATUS[0],
    },
}, {timestamps: true});

articleSchema.index({authorId: 1});
articleSchema.index({hashtags: 1});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;




