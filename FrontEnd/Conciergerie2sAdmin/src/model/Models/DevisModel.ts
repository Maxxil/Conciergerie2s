import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../Enums/CommandeStatusEnum";
import {PrestataireModel} from "./PrestataireModel";

export class DevisModel{
  _id : string;
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  prestataires : PrestataireModel[];
  prestataireChoisi : PrestataireModel;
  information : string;
  heure : string;
  date : Date;
  status : CommandeStatus;

}
