var router = require('express').Router();
var bodyParser = require('body-parser');

var notificationBusiness = require('../business/notificationBusiness');
var Notification = require('../model/notificationModel');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.get('/:token' , function (req, res) {
    var promise = notificationBusiness.getAll();
    promise.exec(function (err, result) {      
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
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});



router.post('/readby' , function(req , res){    
    var promise = notificationBusiness.readBy(req.body.id, req.body.idUtilisateur);
    promise.exec(function(){              
        res.json({
            success : true            
        });
        res.end();
    });    
});

router.post('/archiveby' , function(req , res){    
    var promise = notificationBusiness.archiveBy(req.body.id, req.body.idUtilisateur);
    promise.exec(function(){              
        res.json({
            success : true            
        });
        res.end();
    });    
});


router.delete('/:id' , function (req, res) {
    var id = req.params.id;
    console.log('Delete notification id'+id);
    notificationBusiness.getById(id).exec(function (err,result) {
      
        if(result != null){                  
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