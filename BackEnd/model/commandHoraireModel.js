var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commandeHoraire = new mongoose.Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    prestation : {type : Schema.Types.ObjectId, ref : 'Prestation'},
    prestataires : [{type : Schema.Types.ObjectId, ref : 'Prestataire', default : []}],
    prestataireChoisi : {type : Schema.Types.ObjectId, ref : 'Prestataire'},
    date : 'Date',
    heure : 'String',
    duree : 'Number',
    dateCreation : 'Date',
    status : 'number',
    quantite : 'number'
});

module.exports = mongoose.model("CommandeHoraire" , commandeHoraire);