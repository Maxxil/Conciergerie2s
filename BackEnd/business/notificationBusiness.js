var fs = require('fs');

var Notification = require('../model/notificationModel');
var enums = require('./../helper/enums');

module.exports = {
    newUtilisateur: function(utilisateur) {
        let notification = new Notification({
            statut: enums.NotificationStatus.NON_LU,
            type: utilisateur.role == '1' ? enums.NotificationType.NOUVEAU_CLIENT: enums.NotificationType.NOUVEAU_PRESTATAIRE,
            date: new Date(),
            refId: utilisateur._id,
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': ' Nouveau prestataire à valider'
        });
        notification.save();
    },    
    newDevis: function(devis) {
        let notification = new Notification({
            utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: utilisateur.role == '1' ? enums.NotificationType.NOUVEAU_CLIENT: enums.NotificationType.NOUVEAU_PRESTATAIRE,
            date: new Date(),
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': ' Nouveau prestataire à valider'
        });
        notification.save();
    },
    devisVALIDE: function(devis) {
        let notification = new Notification({
            utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: utilisateur.role == '1' ? enums.NotificationType.NOUVEAU_CLIENT: enums.NotificationType.NOUVEAU_PRESTATAIRE,
            date: new Date(),
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': ' Nouveau prestataire à valider'
        });
        notification.save();
    },
    newCommande: function(commande) {
        let notification = new Notification({
            utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: utilisateur.role == '1' ? enums.NotificationType.NOUVEAU_CLIENT: enums.NotificationType.NOUVEAU_PRESTATAIRE,
            date: new Date(),
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': ' Nouveau prestataire à valider'
        });
        notification.save();
    },
    commandeVALIDE: function(commande) {
        let notification = new Notification({
            utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: utilisateur.role == '1' ? enums.NotificationType.NOUVEAU_CLIENT: enums.NotificationType.NOUVEAU_PRESTATAIRE,
            date: new Date(),
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': ' Nouveau prestataire à valider'
        });
        notification.save();
    },
    prestationTermineeByPrestataire: function(commande) {
        let notification = new Notification({
            utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: utilisateur.role == '1' ? enums.NotificationType.NOUVEAU_CLIENT: enums.NotificationType.NOUVEAU_PRESTATAIRE,
            date: new Date(),
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': ' Nouveau prestataire à valider'
        });
        notification.save();
    },
    prestationTermineByClient: function(commande) {
        let notification = new Notification({
            utilisateur: utilisateur._id,
            statut: enums.NotificationStatus.NON_LU,
            type: utilisateur.role == '1' ? enums.NotificationType.NOUVEAU_CLIENT: enums.NotificationType.NOUVEAU_PRESTATAIRE,
            date: new Date(),
            message: utilisateur.role == '1' ? 'Nouvelle inscription de client': ' Nouveau prestataire à valider'
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