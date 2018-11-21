import { HttpHeaders } from "@angular/common/http";

export const SERVER_URL = "http://localhost:4444";
export const SERVICE_PROVIDER = SERVER_URL + "/service";
export const UTILISATEUR_URL  = SERVER_URL + '/utilisateur';
export const LOGIN_URL = SERVER_URL + '/login';
export const COMMANDE_FORFAIT_URL = SERVER_URL + '/commandeForfait';
export const COMMANDE_HORAIRE_URL = SERVER_URL + '/commandeHoraire';
export const DEVIS_URL = SERVER_URL + '/devis';

export const COMMANDE_FORFAIT_PRESTATAIRE_URL = COMMANDE_FORFAIT_URL + '/prestataire';
export const COMMANDE_HORAIRE_PRESTATAIRE_URL = COMMANDE_HORAIRE_URL + '/prestataire';
export const DEVIS_PRESTATAIRE_URL = DEVIS_URL + '/prestataire';

export const COMMANDE_URL = SERVER_URL + '/commande';
export const COMMANDE_BY_ID_UTILISATEUR = COMMANDE_URL + '/ByIdUtilisateur';

export const UTILISATEUR_PROFILE_URL = UTILISATEUR_URL + '/image/';
export const PAYPAL_URL = SERVER_URL + '/paypal/createPayment';


export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json'
  })
};
