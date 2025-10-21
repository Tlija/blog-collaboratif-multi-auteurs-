const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/error/app_error');

class AuthController {
    constructor() {
        this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'tlija secret';
    }

    createToken = (id) => {
        return jwt.sign({id}, this.ACCESS_TOKEN_SECRET, {
            expiresIn: '1800s'
        });
    };

    async getAllUsers(req, res) {
        const users = await User.find();
        res.status(200).json(users);
    }

    async register(req, res) {
        const {username, email, password, role} = req.body;
        console.log('DEBUG register: Body reçu:', {username, email, role});

        if (!username || !email || !password || !role) {
            throw new AppError('Champs requis manquants : username, email, password, role', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword, role});
        const savedUser = await user.save();

        res.status(201).json({message: 'User registered successfully', userId: savedUser._id});
    }

    async login(req, res) {
        const {email, password} = req.body;

        if (!email || !password) {
            throw new AppError('Email et mot de passe requis', 400);
        }

        const user = await User.findOne({email});
        if (!user) {
            throw new AppError('Email ou mot de passe invalide', 401);
        }

        if (user.status !== 'active') {
            throw new AppError('Votre compte est verrouillé', 403);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError('Email ou mot de passe invalide', 401);
        }

        const token = this.createToken(user._id);
        const {username, role} = user;

        res.status(200).json({token, username, role, id: user._id});
    }

    async getUserDetails(req, res) {
        const {id} = req.params;

        if (!id) {
            throw new AppError('ID utilisateur manquant', 400);
        }

        const user = await User.findById(id, {username: 1, phone: 1, address: 1});
        if (!user) {
            throw new AppError('Utilisateur non trouvé', 404);
        }

        res.status(200).json(user);
    }

    async updateUserStatus(req, res) {
        const {id, status, role} = req.body;

        if (!id || !status || !role) {
            throw new AppError('Champs requis manquants : id, status, role', 400);
        }

        const user = await User.findById(id);
        if (!user) {
            throw new AppError('Utilisateur non trouvé', 404);
        }

        user.status = status;
        user.role = role;
        await user.save();

        res.status(200).json({message: 'Statut utilisateur mis à jour avec succès', user});
    }
}

module.exports = new AuthController();