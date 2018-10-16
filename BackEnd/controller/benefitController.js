var router = require('express').Router();
var bodyParser = require('body-parser');

var loginBusiness = require('./../business/loginBusiness');
var jwt = require('./../helper/tokenHelper');

router.use(bodyParser.json());

router.post('/' , function(req, res){

});

router.put('/', function(req, res){
    
});

module.exports = router;