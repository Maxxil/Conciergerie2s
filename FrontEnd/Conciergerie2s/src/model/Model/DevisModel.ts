import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../CommandeStatusEnum";

export class DevisModel{
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  information : string;
  heure : string;
  date : Date;
  status : CommandeStatus;

}
