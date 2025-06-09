const mongoose=require('mongoose')

/**
 * Schéma Mongoose pour l'utilisateur.
 * Utilisé pour gérer les enregistrements d'utilisateurs dans la base MongoDB.
 * L'email doit être unique et le mot de passe requis.
 */

const uniqueValidator = require('mongoose-unique-validator');

const userSchema=mongoose.Schema(
    {
        email : {type:String,requierd:true,unique:true},
        password: { type: String, required: true }
    }
)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);


