const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Schéma Mongoose pour représenter un film favori d'un utilisateur.
 * Chaque favori est associé à un utilisateur via `userId` et correspond à un film TMDB identifié par `id`.
 */
const FavoriSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  id: { type: Number, required: true }, // ID du film TMDB
  title: { type: String, required: true },
  poster_path: String,
  release_date: String,
});

FavoriSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Favoris', FavoriSchema);