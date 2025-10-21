const User = require("../models/user_model");
const AppError = require("../utils/error/app_error");

class AdminController{

    async getAllUsers(req, res) {
        const users = await User.find();
        res.status(200).json(users);
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

module.exports = new AdminController();