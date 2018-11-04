var Utilisateur = require('./../model/utilisateureModel');
var statusEnum = require('./../helper/statusEnum');
var roleEnum = require('./../helper/roleEnum');
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
            status : statusEnum.status.EN_ATTENTE_VALIDATION,
            addresse : user.addresse,
            telephoneMobile : user.telephoneMobile,
            telephoneFix : user.telephoneFix,
            email : user.email
        });
        Utilisateur.create(promise);
        //promise.save();
    },
    getAllPrestataire : function(){
        return Utilisateur.find({}).where('role').equals(roleEnum.role.PRESTATAIRE).select('nom prenom nomUtilisateur image addresse telephoneMobile telephoneFix email');
    },
    existByUsername: function(user){
        return Utilisateur.find({userName : user.nomUtilisateur});
    },
    existByEmail : function(user){
        return Utilisateur.find({email : user.nomUtilisateur});
    }
}
