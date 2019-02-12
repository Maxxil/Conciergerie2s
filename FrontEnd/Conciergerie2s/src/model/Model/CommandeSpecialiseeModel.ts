import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../CommandeStatusEnum";
import {PrestataireModel} from "./PrestataireModel";

export class CommandeSpecialiseeModel{
  _id: string;
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  prestataires : PrestataireModel[];
  date : Date;
  duree : number = 1;
  quantite : number = 1;
  heure : string;
  status : CommandeStatus = 1;
}
