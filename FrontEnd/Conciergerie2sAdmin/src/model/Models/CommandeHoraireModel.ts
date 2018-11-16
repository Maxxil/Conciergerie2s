import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../Enums/CommandeStatusEnum";

export class CommandeHoraireModel{
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  date : Date;
  duree : number;
  status : CommandeStatus;

}
