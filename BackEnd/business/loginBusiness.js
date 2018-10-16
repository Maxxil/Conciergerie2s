var Utilisateur = require('./../model/utilisateureModel');
module.exports = {
    existUser: function(username, password)
    {
        return Utilisateur.find({nomUtilisateur : username, motDePasse: password });
    }
}
