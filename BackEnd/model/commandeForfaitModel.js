var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commandeForfait = new mongoose.Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    prestation : {type : Schema.Types.ObjectId, ref : 'Prestation'},
    prestataires : [{type : Schema.Types.ObjectId, ref : 'Prestataire', default : []}],
    date : 'Date',
    heureDebut : 'String',
    heureFin : 'String',
    dateCreation : 'Date',
    status : 'number',
    quantite : 'number'
});

module.exports = mongoose.model("CommandeForfait" , commandeForfait);