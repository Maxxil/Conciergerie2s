var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var Schema = mongoose.Schema;
var db = require('./../config/db');

var commandeSpecialisee = new mongoose.Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    prestation : {type : Schema.Types.ObjectId, ref : 'Prestation'},
    prestataires : [{type : Schema.Types.ObjectId, ref : 'Prestataire', default : []}],
    prestataireChoisi : {type : Schema.Types.ObjectId, ref : 'Prestataire'},
    date : 'Date',
    heure : 'String',
    duree : 'Number',
    dateCreation : 'Date',
    status : 'number',
    quantite : 'number',
    dateRealisation: 'Date',
    note: 'Number'

});

commandeSpecialisee.plugin(autoIncrement.plugin, {model : 'CommandeSpecialisee', field : "compteur",startAt: 1});

module.exports = db.model("CommandeSpecialisee" , commandeSpecialisee);