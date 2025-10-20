const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Le nom d’utilisateur est requis'],
      trim: true,
      minlength: [3, 'Le nom d’utilisateur doit contenir au moins 3 caractères'],
      maxlength: [50, 'Le nom d’utilisateur ne peut pas dépasser 50 caractères'],
    },
    email: {
      type: String,
      required: [true, 'L’email est requis'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'L’email doit être valide'],
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est requis'],
      minlength: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
    },
    role: {
      type: String,
      enum: {
        values: ['Admin', 'Éditeur', 'Rédacteur', 'Lecteur'],
        message: 'Le rôle doit être Admin, Éditeur, Rédacteur ou Lecteur',
      },
      default: 'Rédacteur',
      required: [true, 'Le rôle est requis'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'suspended', 'pending'],
        message: 'Le statut doit être active, suspended ou pending',
      },
      default: 'pending',
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpires: {
      type: Date,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      trim: true,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Le numéro de téléphone doit être valide'],
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.role === 'Admin') {
    const adminCount = await this.constructor.countDocuments({ role: 'Admin' });
    if (adminCount > 0 && !this.isModified('role')) {
      return next(new Error('Un administrateur existe déjà'));
    }
  }
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;