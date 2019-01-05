var fs = require('fs');
var OpenSignal = require('onesignal-node');

var Notification = require('../model/notificationModel');
var prestationBusiness = require('./prestationBusiness');
var enums = require('./../helper/enums');
var Conciergeries2SClient = new OpenSignal.Client({
    userAuthKey: '',
    app: { appAuthKey: 'MzE3ZjZkM2EtNzFjYS00NmJhLTk0MGUtMmVhYjA3MDczZGU3', appId: 'aad95661-a550-4d68-a86b-5f72eecc22ed'}
});

var Conciergeries2SAdmin = new OpenSignal.Client({
    userAuthKey: '',
    app: { appAuthKey: 'NTNmNDc5MWYtNWU3My00MGU3LWJlM2MtYmU3NzQ4NzdkODll', appId: '00a67493-1b44-4110-b724-4d1547cc810c'}
});

let sendPushFromNotification = (notification, receiver, prestation = null)  => {

    if (typeof notification !== 'object') {
		throw 'Notification doit etre une notification C2S';
    }
    
    console.log('Notificationobject:',notification);
       

       
  
    //Envoi à l'admin
    if(receiver == 0 || receiver == 2) {
        let pushMessage = new OpenSignal.Notification({      
            contents: {      
                en: notification.message                
            }   
        });   

        pushMessage.postBody['data']  = {
            'refid': notification.refId,
            'type': notification.type,           
        };

       
        pushMessage.postBody["included_segments"] = ["Active Users"];      
        pushMessage.postBody["excluded_segments"] = ["Banned Users"];  
        
        console.log('PushMessage object to Admin',pushMessage);
       Conciergeries2SAdmin.sendNotification(pushMessage, function (err, httpResponse,data) {      
            if (err) {      
                console.log('Something went wrong...');      
            } else {      
                console.log(data, httpResponse.statusCode);      
            }      
        });   
    }
    // Envoi à un client
    if(receiver == 1) {

        let pushMessage = new OpenSignal.Notification({      
            contents: {      
                en: notification.message                
            }   
        });   
        pushMessage.postBody['data']  = {
            'refid': notification.refId,
            'type': notification.type,
            'userid' : notification.utilisateur
        };

        console.log('PushMessage object to Client',pushMessage);
   /*    Conciergeries2SClient.sendNotification(pushMessage, function (err, httpResponse,data) {      
            if (err) {      
                console.log('Something went wrong...');      
            } else {      
                console.log(data, httpResponse.statusCode);      
            }      
        });*/
    }

     // Envoi à aux prestataires
     if(receiver == 2) {

        let pushMessage = new OpenSignal.Notification({      
            contents: {      
                en: notification.message                
            }   
        });   

console.log('Liste des prestataires',prestation.prestataire);

        let prestataires = prestation.prestataire.map(item => { let elt = {}; elt.id=item._id;  elt.lastPlayerId=item.utilisateur.lastPlayerId; return elt;});
        let playerids = prestation.prestataire.map(item => { return item.utilisateur.lastPlayerId});
        pushMessage.postBody['data']  = {
            'refid': notification.refId,
            'type': notification.type,
            'userid' : notification.utilisateur,
            'prestataires': prestataires
        };

      
    //  include_player_ids: 
    pushMessage.postBody["include_player_ids"] = playerids;
        console.log('PushMessage object to Prestataire : ',pushMessage);
       Conciergeries2SClient.sendNotification(pushMessage, function (err, httpResponse,data) {      
            if (err) {      
                console.log('Something went wrong...');      
            } else {      
                console.log(data, httpResponse.statusCode);      
            }      
        });
    }
          
}

module.exports = {
    sendPushAdmin: function() {
        let firstNotification = new OpenSignal.Notification({      
            contents: {      
                en: "Test notification admin via backend",      
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
    sendPushClient: function() {
        let firstNotification = new OpenSignal.Notification({      
            contents: {      
                en: "Test notification client via backend",      
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
        Conciergeries2SClient.sendNotification(firstNotification, function (err, httpResponse,data) {      
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
            utilisateur: '0',
            icon:  utilisateur.role == '1' ? 'person-add' : 'contacts',
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': 'Nouveau prestataire à valider'
        });
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 0); 
        });
    },    
    newDevis: function(devis) {
        prestationBusiness.getByIdWithPrestataire(commande.prestation).then((result) => {
            let notification = new Notification({
                utilisateur: devis.client._id,
                statut: enums.NotificationStatus.NON_LU,
                type: enums.NotificationType.NOUVEAU_DEVIS,
                date: new Date(),
                refId: devis._id,
                icon: 'briefcase',
                message: 'Nouveau devis'
            });        
            let promise = notification.save();
            promise.then(function(elt) {
                sendPushFromNotification(elt, 2,result[0]); 
            });
        });
    },
    propositionPrestataireSurDevis: function(devis) {
        console.log('***************************************');
        console.log('Notification Proposition prestataire', devis);
        let notification = new Notification({
            utilisateur: devis.client._id,
            statut: enums.NotificationStatus.NON_LU,
            type:  enums.NotificationType.PROPOSITION_PRESTATAIRE,
            date: new Date(),
            refId: devis._id,
            icon: 'mail',
            message: "Nouvelle proposition d'un prestataire sur devis"
        });      
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 0);             
        });
    },
    propositionPrestataire: function(devis) {
        console.log('***************************************');
        console.log('Notification Proposition prestataire', devis);
        let notification = new Notification({
            utilisateur: devis.client._id,
            statut: enums.NotificationStatus.NON_LU,
            type:  enums.NotificationType.PROPOSITION_PRESTATAIRE,
            date: new Date(),
            refId: devis._id,
            icon: 'mail',
            message: "Nouvelle proposition d'un prestataire sur une commande"
        });      
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 0);             
        });
    },
    prestataireChoisi: function(devis) {
        console.log('***************************************');
        console.log('Notification Prestataire choisi', devis);
        let notification = new Notification({
            utilisateur: devis.client._id,
            statut: enums.NotificationStatus.NON_LU,
            type:  enums.NotificationType.PROPOSITION_PRESTATAIRE,
            date: new Date(),
            refId: devis._id,
            icon: 'mail',
            message: "Prestation planifiée - Devis à régler"
        });      
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 1);             
        });
    },
    devisVALIDE: function(devis) {
        let notification = new Notification({
            utilisateur: devis.client._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.DEVIS_VALIDE,
            date: new Date(),
            refId: devis._id,
            icon: 'send',
            message: 'Votre devis est validé'
        });        
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 1, devis);             
        });
    },
    newCommande: function(commande) {
        console.log('***************************************');
        console.log('Notification New Commande', commande);

        prestationBusiness.getByIdWithPrestataire(commande.prestation).then((result) => {
            console.log('Prestation : ',result[0] );
            var prestation = result[0];
            let notification = new Notification({
                utilisateur: commande.client._id,
                statut: enums.NotificationStatus.NON_LU,
                type: enums.NotificationType.NOUVELLE_COMMANDE,
                date: new Date(),
                refId: commande._id,
                icon: 'cart',
                message: 'Nouvelle commande de client'
            });
            let promise = notification.save();
            promise.then(function(elt) {                 
                sendPushFromNotification(elt, 2,prestation);         
            });
        
        });
    },
    commandeVALIDE: function(commande) {
        let notification = new Notification({
            utilisateur: commande.client._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.COMMANDE_VALIDE,
            date: new Date(),
            refId: commande._id,
            icon: 'basket',
            message: 'Commande validée.'
        });
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 1, commande);             
        });
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