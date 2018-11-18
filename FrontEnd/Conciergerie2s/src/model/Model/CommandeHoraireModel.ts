import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../CommandeStatusEnum";
import {PrestataireModel} from "./PrestataireModel";

export class CommandeHoraireModel{
  _id: string;
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  prestataires : PrestataireModel[];
  date : Date;
  duree : number;
  quantite : number = 1;
  heure : string;
  status : CommandeStatus;

  constructor() {
    this.duree = 1;
  }
}
