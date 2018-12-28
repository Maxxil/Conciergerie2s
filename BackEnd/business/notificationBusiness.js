var fs = require('fs');
var OpenSignal = require('onesignal-node');

var Notification = require('../model/notificationModel');
var enums = require('./../helper/enums');
/*var Conciergeries2SClient = new OpenSignal.Client({
    userAuthKey: '',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX'}
});*/

var Conciergeries2SAdmin = new OpenSignal.Client({
    userAuthKey: '',
    app: { appAuthKey: 'NTNmNDc5MWYtNWU3My00MGU3LWJlM2MtYmU3NzQ4NzdkODll', appId: '00a67493-1b44-4110-b724-4d1547cc810c'}
});

let sendPushFromNotification = (notification, receiver)  => {

    if (typeof notification !== 'object') {
		throw 'Notification doit etre une notification C2S';
    }
    let pushMessage = new OpenSignal.Notification({      
        contents: {      
            en: notification.message,
            tr: "Test mesajı"      
        }   
    });   
    pushMessage.postBody['data']  = {
        'userid': notification.utilisateur._id,
        'type': notification.type
    };

    if(receiver == 0) {
        Conciergeries2SAdmin.sendNotification(pushMessage, function (err, httpResponse,data) {      
            if (err) {      
                console.log('Something went wrong...');      
            } else {      
                console.log(data, httpResponse.statusCode);      
            }      
        });   
    }
    else {
        Conciergeries2SAdmin.sendNotification(pushMessage, function (err, httpResponse,data) {      
            if (err) {      
                console.log('Something went wrong...');      
            } else {      
                console.log(data, httpResponse.statusCode);      
            }      
        });
    }
          
}

module.exports = {
    sendPush: function() {
        let firstNotification = new OpenSignal.Notification({      
            contents: {      
                en: "Test notification via backend",      
                tr: "Test mesajı"      
            }      
        });      
              
        // set target users      
        firstNotification.postBody["included_segments"] = ["Active Users"];      
        firstNotification.postBody["excluded_segments"] = ["Banned Users"];      
              
        // set notification parameters      
        //firstNotification.postBody["data"] = {"abc": "123", "foo": "bar"};      
        //firstNotification.postBody["send_after"] = 'Thu Sep 24 2015 14:00:00 GMT-0700 (PDT)';    
              
        // send this notification to All Users except Inactive ones      
        Conciergeries2SAdmin.sendNotification(firstNotification, function (err, httpResponse,data) {      
           if (err) {      
               console.log('Something went wrong...');      
           } else {      
               console.log(data, httpResponse.statusCode);      
           }      
        });   
    },
    newUtilisateur: function(utilisateur) {
        let notification = new Notification({
            statut: enums.NotificationStatus.NON_LU,
            type: utilisateur.role == '1' ? enums.NotificationType.NOUVEAU_CLIENT: enums.NotificationType.NOUVEAU_PRESTATAIRE,
            date: new Date(),
            refId: utilisateur._id,
            icon:  utilisateur.role == '1' ? 'person-add' : 'contacts',
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': 'Nouveau prestataire à valider'
        });
        notification.save();
    },    
    newDevis: function(devis) {
        let notification = new Notification({
            utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.NOUVEAU_DEVIS,
            date: new Date(),
            refId: 'id_du_devis',
            icon: 'briefcase',
            message: 'Nouveau devis'
        });
        notification.save();
    },
    propositionPrestatire: function(devis) {
        let notification = new Notification({
            utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type:  enums.NotificationType.PROPOSITION_PRESTATAIRE,
            date: new Date(),
            refId: 'id_du_devis',
            icon: 'mail',
            message: "Nouvelle proposition d'un prestataire"
        });
        notification.save();
    },
    devisVALIDE: function(devis) {
        let notification = new Notification({
            //utilisateur: devis._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.DEVIS_VALIDE,
            date: new Date(),
            refId: 'id_devis',
            icon: 'send',
            message: 'Votre devis est validé'
        });
        notification.save();
    },
    newCommande: function(commande) {
        let notification = new Notification({
            //utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.NOUVELLE_COMMANDE,
            date: new Date(),
            refId: 'id_commande',
            icon: 'cart',
            message: 'Nouvelle commande de client'
        });
        notification.save();
    },
    commandeVALIDE: function(commande) {
        let notification = new Notification({
            //utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.COMMANDE_VALIDE,
            date: new Date(),
            refId: 'id_commande',
            icon: 'basket',
            message: 'Commande validée.'
        });
        notification.save();
    },
    prestationTermineeByPrestataire: function(commande) {
        let notification = new Notification({
           // utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.PRESTATION_TERMINEE_PRESTATAIRE,
            date: new Date(),
            refId: 'id_commande',
            message: 'Prestation terminée - Notification du prestataire'
        });
        notification.save();
    },
    prestationTermineByClient: function(commande) {
        let notification = new Notification({
           // utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.PRESTATION_TERMINEE_CLIENT,
            date: new Date(),
            refId: 'id_commande',
            message: 'Prestation terminée - Notification du client'
        });
        notification.save();
    },
    add: function(notification){
        console.log(notification);        
        notification.save();
    },
    update: function(notification){
        return Notification.updateOne({_id : notification._id} , notification, {upsert : true});
    },
    getAll: function(){
        return Notification.find({});
    },
    getById: function(id){
        return Notification.findById(id);
    },   
    delete: function(id){
        Notification.deleteOne({_id : id}).exec();
    }
};