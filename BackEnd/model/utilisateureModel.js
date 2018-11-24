var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var utilisateur = new mongoose.Schema({
    nom: 'String',
    prenom: "String",
    nomUtilisateur : 'String',
    motDePasse: 'String',
    image: 'String',
    role: 'Number',
    status: 'Number',
    addresse: 'String',
    telephoneMobile: 'String',
    telephoneFix: 'String',
    email : 'String',
    siret: 'String',
    entreprise: 'String',
    codepostal: 'Number',
    ville:  'String',
    historique : [{ type: Schema.Types.ObjectId, ref: 'Historique' }]
});

module.exports = mongoose.model("Utilisateur", utilisateur);