var db = require('./config/db');

var prestation = require('./model/prestationModel');
var prestationBusiness = require('./business/prestationBusiness');

prestation.find({typeprix : 1}).exec(function (err,result) {
    result.forEach(function(prest){
        console.log(prest);
        prest.typePrestationSpecialisee = 1;
        prestationBusiness.update(prest).exec();

    })
});