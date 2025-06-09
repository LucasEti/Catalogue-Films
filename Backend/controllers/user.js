const User=require('../models/User');
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');

/**
 * Inscription d’un nouvel utilisateur.
 *
 * @param {Object} req - Requête HTTP entrante.
 * @param {Object} req.body - Corps de la requête contenant les données de l’utilisateur.
 * @param {string} req.body.email - Email de l’utilisateur.
 * @param {string} req.body.password - Mot de passe non haché de l’utilisateur.
 * @param {Object} res - Réponse HTTP à envoyer au client.
 * @param {Function} next - Middleware suivant (non utilisé ici).
 * @returns {void} - Répond avec un message de succès ou une erreur JSON.
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error=>res.status(400).json({ error}))
            
        })
        .catch(error => {
            res.status(500).json({ error});
        });
};

/**
 * Connexion d’un utilisateur existant.
 *
 * @param {Object} req - Requête HTTP entrante.
 * @param {Object} req.body - Corps de la requête contenant les identifiants.
 * @param {string} req.body.email - Email de l’utilisateur.
 * @param {string} req.body.password - Mot de passe non haché de l’utilisateur.
 * @param {Object} res - Réponse HTTP à envoyer au client.
 * @param {Function} next - Middleware suivant (non utilisé ici).
 * @returns {void} - Répond avec un token JWT ou une erreur JSON.
 */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'paire identifiants/mdp incorrecte ' });
                }
                res.status(200).json({
                    userId : user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => {
                res.status(500).json({ error: 'Erreur lors de la connexion.' });
            });
    })
    .catch(error => {
        res.status(500).json({ error: 'Erreur lors de la connexion.' });
    });
};