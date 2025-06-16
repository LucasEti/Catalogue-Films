const Favoris = require('../models/Favoris');


/**
 * Ajoute un film aux favoris de l'utilisateur connecté.
 *
 * @param {Object} req - Objet requête HTTP, contenant dans `req.body` les données du film,
 *                       et dans `req.auth.userId` l'identifiant de l'utilisateur authentifié.
 * @param {Object} res - Objet réponse HTTP.
 * @param {Function} next - Middleware suivant (non utilisé ici).
 */
exports.AddFavoris =  (req, res, next) => {
  const filmData = req.body;
  const newFavori = new Favoris({
    ...filmData,
    userId: req.auth.userId
  });
    newFavori.save()
  .then(savedFavori => res.status(201).json(savedFavori))
  .catch(error => res.status(400).json({ error })); 
}


/**
 * Récupère la liste des favoris pour l'utilisateur connecté.
 *
 * @param {Object} req - Objet requête HTTP, contenant dans `req.auth.userId` l'identifiant de l'utilisateur.
 * @param {Object} res - Objet réponse HTTP.
 * @param {Function} next - Middleware suivant (non utilisé ici).
 */
exports.GetFavoris = (req, res, next) => {
  const userId = req.auth.userId;
  Favoris.find({ userId: userId })
    .then(favoris => res.status(200).json(favoris))
    .catch(error => res.status(400).json({ error: 'Erreur récupération favoris' }));
} 


/**
 * Supprime un favori spécifique pour l'utilisateur connecté.
 *
 * @param {Object} req - Objet requête HTTP, avec `req.params.id` identifiant du favori à supprimer,
 *                       et `req.auth.userId` identifiant de l'utilisateur.
 * @param {Object} res - Objet réponse HTTP.
 * @param {Function} next - Middleware suivant (non utilisé ici).
 */
exports.DeleteFavoris = (req, res, next) => {
  const userId = req.auth.userId;
  const filmId = req.params.id; // ID du film à supprimer
  Favoris.findOneAndDelete({ userId: userId, id: filmId })
    .then(() => res.status(200).json({ message: 'Favori supprimé avec succès !' }))
    .catch(error => res.status(400).json({ error }));
}

