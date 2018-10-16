var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var prestataire = new mongoose.Schema({
    prix : 'Number',
    utilisateur : [{type: Schema.Types.ObjectId, ref:'Utilisateur'}]
});

module.exports = mongoose.model("Prestataire" , prestataire);