import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../CommandeStatusEnum";
import {PrestataireModel} from "./PrestataireModel";

export class CommandeForfaitModel{
  _id : string;
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  prestataires : PrestataireModel[];
  date : Date;
  heureDebut : string;
  heureFin : string;
  quantite : number = 1;
  status : CommandeStatus = 1;
}
