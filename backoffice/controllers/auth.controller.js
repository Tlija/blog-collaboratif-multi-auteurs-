const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');

class AuthController {

    createToken = (id) => {
        return jwt.sign({id}, 'tlija secret', {
            expiresIn: '1800s'
        });
    };


    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };

    async register(req, res) {
        try {
            const {username, email, password, role,} = req.body;
            console.log('DEBUG register: Body reçu:', {username, email, role});
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({username, email, password: hashedPassword, role,});
            await user.save();
            res.status(201).json({message: 'User registered successfully'});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };

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

    async getUserDetails(req, res) {
        try {
            const {id} = req.params;

            if (!id) {
                return res.status(400).json({error: 'Missing required field: id'});
            }

            const user = await User.findById(id, {username: 1,});
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            const {username, phone = '', address = ''} = user;

            res.status(200).json({username, phone, address});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };


    async updateUserStatus(req, res) {
        try {
            const {id, status, role} = req.body;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            user.status = status
            user.role = role
            await user.save();

            res.status(200).json({message: 'User status updated successfully', user});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };

}

module.exports = new AuthController();