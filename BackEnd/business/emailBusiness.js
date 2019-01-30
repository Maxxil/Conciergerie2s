var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'c2s972@gmail.com',
        pass: 'prospere972'
    }
});

module.exports = {
    envoyerEmail : function (destinataire, sujet, message) {
        var mailOptions = {
            from: 'c2s972@gmail.com',
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

