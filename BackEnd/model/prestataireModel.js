var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = require('./../config/db');

var prestataire = new mongoose.Schema({
    prix : 'Number',
    utilisateur : {type: Schema.Types.ObjectId, ref:'Utilisateur'}
});

module.exports = db.model("Prestataire" , prestataire);