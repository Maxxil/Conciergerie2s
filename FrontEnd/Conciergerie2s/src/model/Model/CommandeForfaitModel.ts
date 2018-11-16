import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../CommandeStatusEnum";

export class CommandeForfaitModel{
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  date : Date;
  heureDebut : string;
  heureFin : string;
  status : CommandeStatus;
}
