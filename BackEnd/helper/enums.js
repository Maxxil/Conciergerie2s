module.exports = {
    TypePrix : {
        HEURE : 1,
        FORFAIT : 2,
        DEVIS : 3
    },
    Error : {
        AUCUNE_ERREUR : 1,
        SERVICE_INSERT_ERROR : 2,
        PRESTATION_INSERT_ERROR : 3,
        PRESTATION_EXISTANTE_DANS_SERVICE : 4,
        PRESTATAIRE_EXISTANTE_DANS_PRESTATION : 5,
        PRESTATION_DEJA_EXISTANTE : 6,
        UTILISATEUR_NON_CONNU : 7
    },
    CommandeStatus : {
        EN_COURS_ANALYSE : 1,
        VALIDEE : 2,
        LIVREE : 3,
        EN_COURS_VALIDATION : 4
    },
    NotificationStatus: {
        NON_LU: 0,
        LU: 1
    },
    NotificationType: {
        NOUVELLE_COMMANDE: 0,
        NOUVEAU_CLIENT: 1,
        NOUVEAU_PRESTATAIRE: 2,
        NOUVEAU_DEVIS: 3,
        DEVIS_VALIDE: 4,
        PRESTATION_TERMINEE_PRESTATAIRE: 5,
        PRESTATION_TERMINEE_CLIENT: 6,
        COMMANDE_VALIDE: 7  ,
        PROPOSITION_PRESTATAIRE: 8  
    }
};