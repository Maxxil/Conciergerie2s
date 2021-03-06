var fs = require('fs');
var OpenSignal = require('onesignal-node');

var Notification = require('../model/notificationModel');
var prestationBusiness = require('./prestationBusiness');
var Devis = require('./../model/devisModel');
var enums = require('./../helper/enums');

/** Onsignal DEV */
/*var Conciergeries2SClient = new OpenSignal.Client({
    userAuthKey: '',
    app: { appAuthKey: 'MzE3ZjZkM2EtNzFjYS00NmJhLTk0MGUtMmVhYjA3MDczZGU3', appId: 'aad95661-a550-4d68-a86b-5f72eecc22ed'}
});

var Conciergeries2SAdmin = new OpenSignal.Client({
    userAuthKey: '',
    app: { appAuthKey: 'NTNmNDc5MWYtNWU3My00MGU3LWJlM2MtYmU3NzQ4NzdkODll', appId: '00a67493-1b44-4110-b724-4d1547cc810c'}
});*/

/** Onsignal PROD */
var Conciergeries2SClient = new OpenSignal.Client({
    userAuthKey: '',
    app: { appAuthKey: 'YTFkNTYzNjMtYWViZS00ZGE4LWE4OWItZGIzMGEyOWJjYzNm', appId: 'd81fba5f-1718-4098-9df0-0666fe5c4a76'}
});


var Conciergeries2SAdmin = new OpenSignal.Client({
    userAuthKey: '',
    app: { appAuthKey: 'ZWI3MDM1ZmMtMzJjMi00ZThkLWJlN2ItNWFmZmM5ZWQ1YzQ1', appId: 'affd37ee-8242-4949-b3c5-d4664533a582'}
});

let sendPushFromNotification = (notification, receiver, obj = null)  => {

    if (typeof notification !== 'object') {
		throw 'Notification doit etre une notification C2S';
    }
    
    console.log('Notification object : ',notification);
    console.log('Notification obj : ',obj);
       

       
  
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
        
        console.log('PushMessage object to Admin : \n',pushMessage);
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

       

        let client = obj.client;

        pushMessage.postBody["include_player_ids"] = [client.lastPlayerId];

        console.log('PushMessage object to CLIENT : \n',pushMessage);
        if(client.lastPlayerId) {
            Conciergeries2SClient.sendNotification(pushMessage, function (err, httpResponse,data) {      
                if (err) {      
                    console.log('Something went wrong...');      
                } else {      
                    console.log(data, httpResponse.statusCode);      
                }      
            });
        }
    }

     // Envoi à aux prestataires
     if(receiver == 2) {

        let pushMessage = new OpenSignal.Notification({      
            contents: {      
                en: notification.message                
            }   
        });   
        
        

        //let prestataires = obj.prestataire.map(item => { let elt = {}; elt.id=item._id;  elt.lastPlayerId=item.utilisateur.lastPlayerId; return elt;});
        
        
        console.log('Liste des prestataires \n',obj.prestataire);
        var playerids = [];
        obj.prestataire.forEach(function (item) {
            if(item.utilisateur.lastPlayerId != null) {
                playerids.push(item.utilisateur.lastPlayerId);
            }
        });
        
        //let playerids = obj.prestataires.map(item => { return item.lastPlayerId;}).filter((item) => item.lastPlayerId != null);
        console.log('Liste des playerids \n',playerids);
        
        
        pushMessage.postBody['data']  = {
            'refid': notification.refId,
            'type': notification.type,
            'userid' : notification.utilisateur            
        };

      
        //  include_player_ids: 
            pushMessage.postBody["include_player_ids"] = playerids;
        console.log('PushMessage object to Prestataire : \n',pushMessage);

        if(playerids.length == 0) {
            console.log('>>>>>>****** Pas de players Ids');
        }
       Conciergeries2SClient.sendNotification(pushMessage, function (err, httpResponse,data) {      
            if (err) {      
                console.log('Something went wrong...');      
            } else {      
                console.log(data, httpResponse.statusCode);      
            }      
        });
    }

    // Envoi  au client et au prestataire
    if(receiver == 3) {

        let pushMessage = new OpenSignal.Notification({      
            contents: {      
                en: notification.message                
            }   
        });           

        
        let client = obj.client;
       if(obj.prestataireChoisi) {
            let prestataireChoisi = obj.prestataireChoisi.utilisateur;           
            pushMessage.postBody['data']  = {
                'refid': notification.refId,
                'type': notification.type,
                'userid' : notification.utilisateur,
                'prestataireChoisi': prestataireChoisi.lastPlayerId,
                'client': client.lastPlayerId
            };
            
        } else  {
            pushMessage.postBody['data']  = {
                'refid': notification.refId,
                'type': notification.type,
                'userid' : notification.utilisateur,                
                'client': client.lastPlayerId
            };
        }


      
        //  include_player_ids: 
        if(client.lastPlayerId) {
        pushMessage.postBody["include_player_ids"] = [client.lastPlayerId];
        console.log('PushMessage object to Client : \n',pushMessage);
        Conciergeries2SClient.sendNotification(pushMessage, function (err, httpResponse,data) {      
            if (err) {      
                console.log('Something went wrong...');      
            } else {      
                console.log(data, httpResponse.statusCode);      
            }      
        });
        }
        else {
            console.log('>>>>>>>>> CLient id sans PlayerId : '+client._id)
        }


       
        if(prestataireChoisi) {
            pushMessage = new OpenSignal.Notification({      
                contents: {      
                    en: 'Vous avez été choisi pour realiser une prestation'               
                }   
            }); 
            
            pushMessage.postBody["include_player_ids"] = [prestataireChoisi.lastPlayerId];
            console.log('PushMessage object to Prestataire : \n',pushMessage);

            Conciergeries2SClient.sendNotification(pushMessage, function (err, httpResponse,data) {      
                if (err) {      
                    console.log('Something went wrong...');      
                } else {      
                    console.log(data, httpResponse.statusCode);      
                }      
            });
        }

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
            utilisateur: utilisateur._id,
            icon:  utilisateur.role == '1' ? 'person-add' : 'contacts',
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': 'Nouveau prestataire à valider',
            readBy: [],
            archiveBy: []
        });
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 0); 
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
                message: 'Nouvelle commande de client',
                readBy: [],
                archiveBy: []
            });
            let promise = notification.save();
            promise.then(function(elt) {                 
                sendPushFromNotification(elt, 2,prestation);         
            });
        
        });
    },
    newDevis: function(devis) {
        console.log('NEW DEVIS\n',devis);
        prestationBusiness.getByIdWithPrestataire(devis.prestation).then((result) => {
            let notification = new Notification({
                utilisateur: devis.client._id,
                statut: enums.NotificationStatus.NON_LU,
                type: enums.NotificationType.NOUVEAU_DEVIS,
                date: new Date(),
                refId: devis._id,
                icon: 'briefcase',
                message: 'Nouveau devis',
                readBy: [],
                archiveBy: []
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
            message: "Nouvelle proposition de devis",
            readBy: [],
            archiveBy: []
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
            message: "Un prestataire a postulé sur une commande",
            readBy: [],
            archiveBy: []
        });      
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 0);             
        });
    },
    prestataireChoisi: function(devis) {
        console.log('***************************************');
        Devis.find({_id : devis._id}).populate([{path : 'prestataireChoisi', populate: {path : "utilisateur" , select:"nom prenom lastPlayerId"} },{path : 'client', select : '_id nom prenom lastPlayerId'}])
        .exec(function (err, result) {
            let nDevis = result[0];
        console.log('Notification Prestataire choisi', nDevis);
        let notification = new Notification({
            utilisateur: nDevis.client._id,
            statut: enums.NotificationStatus.NON_LU,
            type:  enums.NotificationType.DEVIS_A_REGLER,
            date: new Date(),
            refId: devis._id,
            icon: 'mail',
            message: "Prestation planifiée - Devis à régler",
            readBy: [],
            archiveBy: []
        });      
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 3, nDevis);             
        });
      });
    },
    prestataireC2SChoisi: function(devis) {
        console.log('***************************************');
        console.log('Notification Prestataire C2S choisi', devis);
        let notification = new Notification({
            utilisateur: devis.client._id,
            statut: enums.NotificationStatus.NON_LU,
            type:  enums.NotificationType.DEVIS_A_REGLER,
            date: new Date(),
            refId: devis._id,
            icon: 'mail',
            message: "Prestation planifiée - Devis à régler",
            readBy: [],
            archiveBy: []
        });      
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 1, devis);             
        });
    },
    devisEvent: function(devis) {

    },
    devisVALIDE: function(devis) {
        let notification = new Notification({
            utilisateur: devis.client._id,
            statut: enums.NotificationStatus.NON_LU,
            type: enums.NotificationType.DEVIS_VALIDE,
            date: new Date(),
            refId: devis._id,
            icon: 'send',
            message: 'Votre devis est validé',
            readBy: [],
            archiveBy: []
        });        
        let promise = notification.save();
        promise.then(function(elt) {
            sendPushFromNotification(elt, 1, devis);             
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
            message: 'Commande validée.',
            readBy: [],
            archiveBy: []
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
            message: 'Prestation terminée - Notification du prestataire',
            readBy: [],
            archiveBy: []
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
            message: 'Prestation terminée - Notification du client',
            readBy: [],
            archiveBy: []
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
        return Notification.find({}).populate([{path: 'utilisateur' , select : '_id nom prenom'}]);
    },
    getById: function(id){
        return Notification.findById(id);
    },   
    readBy: function(id,idUtilisateur){              
        return Notification.findById(id, function(err, notification) {  
            console.log(notification)          ;
            if(!err &&  notification.readBy.indexOf(idUtilisateur) == -1) {                
                notification.readBy.push(idUtilisateur);
                notification.save();                
            }
            else {
                console.log(err);
            }
        });
    }, 
    archiveBy: function(id,idUtilisateur){              
        return Notification.findById(id, function(err, notification) {            
            if(!err &&  notification.archiveBy.indexOf(idUtilisateur) == -1) {                
                notification.archiveBy.push(idUtilisateur);
                if(notification.readBy.indexOf(idUtilisateur) == -1) {  
                    notification.readBy.push(idUtilisateur);
                }    
                notification.save();                
            }
        });
    }, 
    delete: function(id){
        Notification.deleteOne({_id : id}).exec();
    }
    
};