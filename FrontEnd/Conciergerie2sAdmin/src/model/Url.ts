import { HttpHeaders } from "@angular/common/http";

export const HTTP_OPTIONS = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };
;

export const SERVER_URL : string = "http://149.56.13.37:4444";
//export const SERVER_URL : string = "http://localhost:4444";
export const LOGIN_URL: string = SERVER_URL + '/login';
export const PRESTATION_URL : string = SERVER_URL + '/prestation';
export const SERVICE_URL : string = SERVER_URL + '/service';
export const SERVICE_UPDATE_UPLOADED_IMAGE : string = SERVICE_URL + '/image';
export const SERVICE_IMAGE_URL : string = SERVICE_URL + "/image/";
export const PRESTATAIRE_URL : string = SERVER_URL + '/prestataire/';
export const PRESTATION_IMAGE_URL : string = PRESTATION_URL + '/image/';
export const LIER_SERVICE_PRESTATION_URL: string = SERVER_URL + '/lierServicePrestation';
export const SERVICE_PRESTATION_URL: string = SERVER_URL + '/servicePrestation';

export const LIER_PRESTATION_PRESTATAIRE_URL: string = SERVER_URL + '/lierPrestationPrestataire';
export const VALIDER_PRESTATAIRE : string = SERVER_URL + '/validerPrestataire';
export const DEVALIDER_PRESTATAIRE : string = SERVER_URL + '/devaliderPrestataire';
export const UTILISATEUR_URL : string = SERVER_URL + '/utilisateur';
export const UTILISATEUR_PRESTATAIRE : string = UTILISATEUR_URL + '/prestataire';
export const COMMANDE_FORFAIT_URL = SERVER_URL + '/commandeForfait';
export const COMMANDE_HORAIRE_URL = SERVER_URL + '/commandeHoraire';
export const DEVIS_URL = SERVER_URL + '/devis';
export const DEVIS_CHOIX_URL = DEVIS_URL + '/choixprestataire';
export const DEVIS_C2S_URL = DEVIS_URL + '/c2s';
export const COMMANDE_URL = SERVER_URL + '/commande';

export const UTILISATEUR_PROFILE_URL = UTILISATEUR_URL + '/image/';
export const PAYPAL_URL = SERVER_URL + '/paypal';

export const CHAT_URL = "http://149.56.13.37:5555";

export const NOTIFICATION_URL : string = SERVER_URL + '/notification';
//export const CHAT_URL = "http://localhost:5555";

/** Onesignal DEV */
/*export const sender_id = '1963361158';
export const oneSignalAppId = '00a67493-1b44-4110-b724-4d1547cc810c';
/


/** Onesignal PROD */
export const sender_id = '617588498652';
export const oneSignalAppId = 'affd37ee-8242-4949-b3c5-d4664533a582';

