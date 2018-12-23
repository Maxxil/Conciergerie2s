var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = require('./../config/db');

var devisProposition = new mongoose.Schema({
    prestataire : {type : Schema.Types.ObjectId, ref : 'Prestataire'},
    prix : 'Number',
    dateProposee : 'Date',
    date : 'Date',
    statut : 'Number'
});


module.exports = db.model("DevisProposition" , devisProposition);