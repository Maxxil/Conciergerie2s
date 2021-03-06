import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../CommandeStatusEnum";
import {DevisPropositionModel} from "./DevisPropositionModel";
import {PrestataireModel} from "./PrestataireModel";

export class DevisModel{
  _id : string;
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  propositions : DevisPropositionModel[];
  prestataireChoisi : PrestataireModel;
  information : string;
  heure : string;
  date : Date;
  status : CommandeStatus = 1;
  dateCreation : Date;
  dateC2S : Date;
  prixC2S : number;
  byC2S:  number;
  dateReglement: number;
  dateRealisation: Date;
  modepaiement: 'String';
  note: number;
  compteur: number;
}
