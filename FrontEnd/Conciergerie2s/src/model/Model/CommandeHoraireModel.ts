import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../CommandeStatusEnum";

export class CommandeHoraireModel{
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  date : Date;
  duree : number;
  heure : string;
  status : CommandeStatus;
}
