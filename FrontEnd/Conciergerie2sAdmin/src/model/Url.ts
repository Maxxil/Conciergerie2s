import { HttpHeaders } from "@angular/common/http";

export const HTTP_OPTIONS = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };


export const SERVER_URL : string = "http://localhost:4444"
export const LOGIN_URL: string = SERVER_URL + '/login';
export const PRESTATION_URL : string = SERVER_URL + '/prestation';
export const SERVICE_URL : string = SERVER_URL + '/service';
export const SERVICE_UPDATE_UPLOADED_IMAGE : string = SERVICE_URL + '/image';
export const SERVICE_IMAGE_URL : string = SERVICE_URL + "/image/";
export const PRESTATION_IMAGE_URL : string = PRESTATION_URL + '/image/';
export const LIER_SERVICE_PRESTATION_URL: string = SERVER_URL + '/lierServicePrestation';
export const LIER_PRESTATION_PRESTATAIRE_URL: string = SERVER_URL + '/lierPrestationPrestation';
