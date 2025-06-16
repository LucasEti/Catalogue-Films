const express = require('express');
const router = express.Router();
const FavorisCtrl = require('../controllers/favoris');
const auth = require('../middleware/auth');


/**
 * Fichier de définition des routes liées aux favoris utilisateur.
 * Ces routes appellent les fonctions contrôleur définies dans FavorisCtrl.
 * Ajout du middleware d'authentification pour sécuriser les routes.
 */
router.post('/', auth, FavorisCtrl.AddFavoris);
router.get('/', auth, FavorisCtrl.GetFavoris);
router.delete('/:id', auth, FavorisCtrl.DeleteFavoris);

module.exports = router;