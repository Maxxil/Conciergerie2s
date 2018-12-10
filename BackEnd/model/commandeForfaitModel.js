var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
var Schema = mongoose.Schema;
var db = require('./../config/db');

var commandeForfait = new mongoose.Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    prestation : {type : Schema.Types.ObjectId, ref : 'Prestation'},
    prestataires : [{type : Schema.Types.ObjectId, ref : 'Prestataire', default : []}],
    prestataireChoisi : {type : Schema.Types.ObjectId, ref : 'Prestataire'},
    date : 'Date',
    heureDebut : 'String',
    heureFin : 'String',
    dateCreation : 'Date',
    status : 'number',
    quantite : 'number'
});

commandeForfait.plugin(autoIncrement.plugin, {model : 'CommandeForfait', field : "compteur",startAt: 1});


module.exports = db.model("CommandeForfait" , commandeForfait);