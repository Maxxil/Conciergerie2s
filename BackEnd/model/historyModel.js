var mongoose = require("mongoose");
var db = require("./../config/db");

var history = new mongoose.Schema({
    date : "Date"
});

module.exports = db.model("History" , history);