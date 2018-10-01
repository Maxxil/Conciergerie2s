var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get("/" , function (req, res) {
    res.json({

    });
    res.end();
});

router.post("/", function (req, res) {
    res.json({

    });
    res.end();
});

module.exports = router;