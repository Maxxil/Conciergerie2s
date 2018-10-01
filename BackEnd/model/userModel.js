var mongoose = require('mongoose');
var db = require("./../config/db");

var user = new mongoose.Schema({
    username : 'String',
    password: 'String',
    image: 'String',
    history : [{ type: Schema.Types.ObjectId, ref: 'History' }]
});

module.exports = db.model("User", user);