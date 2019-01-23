var Utilisateur = require('./../model/utilisateureModel');
var bcrypt = require('bcrypt');
module.exports = {
    existUser: function(username, password)
    {

        return Utilisateur.find({
                $or : [{nomUtilisateur: username}, {email : username}]
        });
        //return Utilisateur.find({nomUtilisateur : username, motDePasse: password });
    }
}
