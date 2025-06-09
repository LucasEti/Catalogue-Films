const jwt = require('jsonwebtoken');
 
/**
 * Middleware d’authentification pour les routes protégées.
 * Vérifie que la requête contient un token JWT valide.
 *
 * @param {Object} req - Requête HTTP entrante.
 * @param {Object} res - Réponse HTTP à envoyer.
 * @param {Function} next - Fonction pour passer au middleware suivant.
 * @returns {void} - Si le token est valide, ajoute l’ID utilisateur à req.auth et passe au middleware suivant.
 *                   Sinon, renvoie une erreur 401 (non autorisé).
 */
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

