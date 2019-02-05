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
        EN_COURS_VALIDATION : 4,
        EN_ATTENTE_PAIEMENT : 5,
        REFUSEE : 6,
        ANNULEE : 7,
        PAYEE : 8,
        TERMINEE : 9
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
        PROPOSITION_PRESTATAIRE: 8 ,
        DEVIS_A_REGLER: 9,
        DEVIS_PAYE: 10,
        DEVIS_REFUSE: 11,
        DEVIS_ANNULE: 12
    },
    TypePrixEnum : {
        SPECIALISE : 1,
        FORFAIT : 2,
        DEVIS : 3
    },
    TypePrestationSpecialiseeEnum : {
        HEURE : 1,
        KILOGRAMME : 2,
        LITRE : 3,
        QUANTITE : 4,
        SURFACE : 5
    }
};