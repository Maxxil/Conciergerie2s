import {PrestataireModel} from "./PrestataireModel";
import {DevisModel} from "./DevisModel";

export class DevisPropositionModel{
  _id : string;
  idPrestataire : string;
  prestataires : PrestataireModel;
  devis : DevisModel;
  idDevis : string;
  prix : number;
  dateProposee : Date;
  date : Date;

}
