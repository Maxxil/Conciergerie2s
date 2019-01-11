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


router.delete('/:id' , function (req, res) {
    var id = req.params.id;
    console.log('Delete notification id');
    notificationBusiness.getById(id).exec(function (err,result) {
      
        if(result != null){    
            console.log('Delete notification id '+id);      
            notificationBusiness.delete(id);
            res.json({
                success : true
            });
            res.end();
        }
        else{
            res.json({
                success : false
            });
        }

        res.end();
    })
    
});


module.exports = router;