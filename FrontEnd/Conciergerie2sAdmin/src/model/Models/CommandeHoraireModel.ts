import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";

export class CommandeHoraireModel{
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  date : Date;
  duree : number;
}
