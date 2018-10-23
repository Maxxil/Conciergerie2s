var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var historique = new mongoose.Schema({
    utilisateur: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    status : 'Number',
    prestation : {type: Schema.Types.ObjectId, ref:'Prestation'},
    date : "Date"
});

module.exports = mongoose.model("Historique" , historique);