const express=require('express')
const router=express.Router()
const UserCtrl=require('../controllers/user');

/**
 * Fichier de définition des routes liées à l'authentification utilisateur.
 * Ces routes appellent les fonctions contrôleur définies dans UserCtrl.
 */

router.post('/signup',UserCtrl.signup);
router.post('/login',UserCtrl.login);


module.exports=router;