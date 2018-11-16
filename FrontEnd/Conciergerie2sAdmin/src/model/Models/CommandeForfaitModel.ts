import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../Enums/CommandeStatusEnum";

export class CommandeForfaitModel{
  _id : string;
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  date : Date;
  heureDebut : string;
  heureFin : string;
  status : CommandeStatus;

}
