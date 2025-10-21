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

    async register(req, res) {
        const {username, email, password,} = req.body;

        if (!username || !email || !password) {
            throw new AppError('Champs requis manquants : username, email, password, ', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword,});
        const savedUser = await user.save();

        res.status(201).json({message: 'User registered successfully', userId: savedUser._id});
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(401).json({error: 'Invalid email or password'});
            }
            if (user.status !== 'active') {
                return res.status(403).json({error: 'Votre compte est verrouillé'});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({error: 'Invalid email or password'});
            }

            const token = this.createToken(user._id);
            const id = user._id
            const {username, role} = user;

            res.status(200).json({token, username, role, id});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };


}

module.exports = new AuthController();