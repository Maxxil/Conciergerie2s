var Utilisateur = require('./../model/utilisateureModel');
var statusEnum = require('./../helper/statusEnum');
var roleEnum = require('./../helper/roleEnum');

var bcrypt = require('bcrypt');
const saltRound = 10;

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
            email : user.email,
            siret: user.siret,
            entreprise: user.entreprise,
            codepostal: user.codepostal,
            ville: user.ville
        });
        console.log("Utilisateur à ajouter");
        console.log(promise);
        Utilisateur.create(promise);
    },
    getAll : function () {
        return Utilisateur.find({}).select("_id nom prenom nomUtilisateur image addresse telephoneMobile telephoneFix email status role");
    },
    getAllPrestataire : function(){
        return Utilisateur.find({}).where('role').in([roleEnum.role.ADMIN,roleEnum.role.PRESTATAIRE]).sort('-role')
            .select('_id nom prenom nomUtilisateur image addresse telephoneMobile telephoneFix email status role');
    },
    getAllPrestataireValides : function () {
        return Utilisateur.find({'status' : statusEnum.status.VALIDE}).where('role').equals(roleEnum.role.PRESTATAIRE)
            .select('_id nom prenom nomUtilisateur image addresse telephoneMobile telephoneFix email status');
    },
    getById : function (id) {
        return Utilisateur.find({_id : id});
    },
    existByUsername: function(user){
        return Utilisateur.find({userName : user.nomUtilisateur});
    },
    existByEmail : function(email){
        return Utilisateur.find({email : email});
    },
    existByUsernameOrEmail : function (user) {
        return Utilisateur.find({ $or : [
            {email : user.email}, {nomUtilisateur: user.nomUtilisateur}
        ]});
    },
    update : function (utilisateur) {
        return Utilisateur.updateOne({_id : utilisateur._id} , utilisateur, {upsert : true});
    }
}
