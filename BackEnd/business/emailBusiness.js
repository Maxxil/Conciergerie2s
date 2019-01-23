var nodemailer = require('nodemailer');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'massilkadi@gmail.com',
        pass: 'Zekiki3265'
    }
});

module.exports = {
    envoyerEmail : function (destinataire, sujet, message) {
        var mailOptions = {
            from: 'massilkadi@gmail.com',
            to: destinataire,
            subject: sujet,
            text: message
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
};

