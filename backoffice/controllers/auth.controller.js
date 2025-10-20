const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  constructor() {
    this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'secret';
    this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
  }

  async createAdmin(req, res) {
    try {
      const { username, email, password } = req.body;

      const adminCount = await User.countDocuments({ role: 'Admin' });
      if (adminCount > 0) {
        return res.status(403).json({ error: 'Un administrateur existe déjà' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }

      const user = new User({
        username,
        email,
        password,
        role: 'Admin',
        status: 'active',
      });

      await user.save();

      const accessToken = jwt.sign({ userId: user._id, role: user.role }, this.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign({ userId: user._id }, this.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      });

      user.refreshToken = refreshToken;
      await user.save();

      res.status(201).json({
        message: 'Administrateur créé avec succès',
        accessToken,
        refreshToken,
        user: { id: user._id, username, email, role: user.role },
      });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la création de l’administrateur' });
    }
  }

  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Cet email est déjà utilisé' });
      }

      const user = new User({
        username,
        email,
        password,
        role: 'Rédacteur',
      });

      await user.save();

      const accessToken = jwt.sign({ userId: user._id, role: user.role }, this.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign({ userId: user._id }, this.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      });

      user.refreshToken = refreshToken;
      await user.save();

      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        accessToken,
        refreshToken,
        user: { id: user._id, username, email, role: user.role },
      });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de l’inscription' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const isValid = await user.verifyPassword(password);
      if (!isValid) {
        return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      }

      const accessToken = jwt.sign({ userId: user._id, role: user.role }, this.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign({ userId: user._id }, this.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      });

      user.refreshToken = refreshToken;
      await user.save();

      res.status(200).json({
        message: 'Connexion réussie',
        accessToken,
        refreshToken,
        user: { id: user._id, username: user.username, email, role: user.role },
      });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  }

  async updateRole(req, res) {
    try {
      const { userId, role } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }

      if (role === 'Admin') {
        const adminCount = await User.countDocuments({ role: 'Admin' });
        if (adminCount > 0 && user.role !== 'Admin') {
          return res.status(403).json({ error: 'Un administrateur existe déjà' });
        }
      }

      user.role = role;
      await user.save();

      res.status(200).json({
        message: 'Rôle mis à jour avec succès',
        user: { id: user._id, username: user.username, email: user.email, role: user.role },
      });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour du rôle' });
    }
  }
}

module.exports = new AuthController();