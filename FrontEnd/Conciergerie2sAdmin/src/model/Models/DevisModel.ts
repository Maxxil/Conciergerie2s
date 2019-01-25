import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../Enums/CommandeStatusEnum";
import {PrestataireModel} from "./PrestataireModel";
import {DevisPropositionModel} from "./DevisPropositionModel";

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
  status : CommandeStatus;
  dateCreation : Date;
  dateC2S : Date;
  prixC2S : number;
  byC2S:  number;
  dateReglement: Date;
  dateRealisation: Date;
  modepaiement: 'String';
  note: number;
}
