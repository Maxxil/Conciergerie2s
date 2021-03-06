var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var Schema = mongoose.Schema;
var db = require('./../config/db');

var devis = new mongoose.Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    prestation : {type : Schema.Types.ObjectId, ref : 'Prestation'},
    propositions : [{type : Schema.Types.ObjectId, ref : 'DevisProposition', default : []}],
    prestataireChoisi : {type : Schema.Types.ObjectId, ref : 'Prestataire'},
    prixC2S : 'Number',
    dateC2S : 'Date',
    byC2S: 'Number',
    information : 'String',
    heure : 'String',
    date : 'Date',
    dateCreation : 'Date',
    status : 'Number',
    modepaiement: 'String',
    dateReglement: 'Date',
    dateRealisation: 'Date',
    note: 'Number'
});

devis.plugin(autoIncrement.plugin, {model : 'Devis', field : "compteur",startAt: 1,});

module.exports = db.model("Devis" , devis);