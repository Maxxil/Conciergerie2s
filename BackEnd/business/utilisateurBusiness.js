var Utilisateur = require('./../model/utilisateureModel');
module.exports = {
    any: function()
    {
        return Utilisateur.find({});
    },
    create : function(user){
        var promise = new Utilisateur({
            nomUtilisateur : user.nomUtilisateur,
            motDePasse: user.motDePasse,
            nom: user.nom,
            prenom : user.prenom,
            role : user.role,
            status : user.status,
            addresse : user.addresse,
            telephoneMobile : user.telephoneMobile,
            telephoneFix : user.telephoneFix,
            email : user.email
        });
        Utilisateur.create(promise);
        //promise.save();
    },
    existByUsername: function(user){
        return Utilisateur.find({userName : user.nomUtilisateur});
    },
    existByEmail : function(user){
        return Utilisateur.find({email : user.nomUtilisateur});
    }
}
