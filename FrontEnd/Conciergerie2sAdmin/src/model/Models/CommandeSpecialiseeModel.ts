import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../Enums/CommandeStatusEnum";
import {PrestataireModel} from "./PrestataireModel";

export class CommandeSpecialiseeModel{
  _id : string;
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  prestataires : PrestataireModel[];
  prestataireChoisi : PrestataireModel;
  date : Date;
  duree : number;
  status : CommandeStatus;
  dateCreation : Date;
}
