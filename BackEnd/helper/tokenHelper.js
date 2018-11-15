var jwt = require('jsonwebtoken');
var security = require('./../config/security');

module.exports = {
    verifyToken : function (token) {
        return jwt.verify(token, security.jwtSecret, function (err, decode) {
            if(err)
            {
                return false;
            }
            else
            {
                return true;
            }
        })
    },
    generateToken : function (user) {
        return jwt.sign(
            security.generatePayload(user)
            , security.jwtSecret
        );
    },
    decode : function(token, callback){
        return jwt.verify(token, security.jwtSecret, function (err, decode) {
            console.log(decode);
            console.log(err);
            callback(decode);
        });
    }
};