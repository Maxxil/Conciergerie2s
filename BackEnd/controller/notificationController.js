var router = require('express').Router();
var bodyParser = require('body-parser');

var notificationBusiness = require('../business/notificationBusiness');
var Notification = require('../model/notificationModel');


router.use(bodyParser.json());

router.get('/:token' , function (req, res) {
    var promise = notificationBusiness.getAll();
    promise.exec(function (err, result) {
        console.log("GET NOTIF WITH TOKEN");
        console.log(result);
        res.json({
            success : true,
            data : result,
            total: result.length
        });
        res.end();
    });

});

router.get('/:id/:token', function (req, res) {
    var promise = notificationBusiness.getById(req.params.id);
    promise.exec(function (err, result) {
        console.log("GET BY ID - NOTIF");
        console.log(result);
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});


module.exports = router;