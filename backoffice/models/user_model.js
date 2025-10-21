const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Le nom d’utilisateur est requis'],
        trim: true,
        minlength: [3, 'Le nom d’utilisateur doit contenir au moins 3 caractères'],
        maxlength: [50, 'Le nom d’utilisateur ne peut pas dépasser 50 caractères'],
    }, email: {
        type: String,
        required: [true, 'L’email est requis'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'L’email doit être valide'],
    }, password: {
        type: String,
        required: [true, 'Le mot de passe est requis'],
        minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
    }, role: {
        type: String, enum: {
            values: ['Admin', 'Éditeur', 'Rédacteur', 'Lecteur'],
            message: 'Le rôle doit être Admin, Éditeur, Rédacteur ou Lecteur',
        }, default: 'Lecteur', required: [true, 'Le rôle est requis'],
    }, status: {
        type: String, enum: {
            values: ['active', 'suspended', 'pending'], message: 'Le statut doit être active, suspended ou pending',
        }, default: 'active',
    },


}, {timestamps: true});


const User = mongoose.model('User', userSchema);

module.exports = User;