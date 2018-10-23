import { HttpHeaders } from "@angular/common/http";

export const SERVER_URL = "http://localhost:4444";
export const SERVICE_PROVIDER = SERVER_URL + "/service";
export const UTILISATEUR_URL  = SERVER_URL + '/utilisateur';
export const LOGIN_URL = SERVER_URL + '/login';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json'
  })
};