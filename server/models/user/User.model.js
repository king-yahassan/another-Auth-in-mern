const mongoose = require("mongoose")
const {isEmail} = require("validator");

const userSchema = new mongoose.Schema({
    pseudo: {
        type:String,
        required: true,
        trim: true
    },
    //trim : les espaces blancs seront supprimés des deux côtés de la chaîne.
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail]
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
    /*Un salt est une chaîne aléatoire. En hachant un mot de passe en texte brut plus un sel, 
    la sortie de l'algorithme de hachage n'est plus prévisible. Le même mot de passe ne donnera plus le même hachage. 
    Le sel est automatiquement inclus avec le hachage, vous n'avez donc pas besoin de le stocker dans une base de données.
    le hachage salé répond aux recommandations de sécurité sur la longueur et l'imprévisibilité.*/


})

module.exports = mongoose.model("User", userSchema);