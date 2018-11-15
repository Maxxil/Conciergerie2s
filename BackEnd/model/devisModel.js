var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var devis = new mongoose.Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    prestation : {type : Schema.Types.ObjectId, ref : 'Prestation'},
    prestataires : [{type : Schema.Types.ObjectId, ref : 'Prestataire'}],
    information : 'String',
    heure : 'String',
    date : 'Date',
    dateCreation : 'Date'
});

module.exports = mongoose.model("Devis" , devis);