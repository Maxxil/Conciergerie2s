var Utilisateur = require('./../model/utilisateureModel');
module.exports = {
    existUser: function(username, password)
    {
        return Utilisateur.find({
            $and : [
                {$or : [{nomUtilisateur: username}, {email : username}]}
                , {motDePasse: password}
            ]

        });
        //return Utilisateur.find({nomUtilisateur : username, motDePasse: password });
    }
}
