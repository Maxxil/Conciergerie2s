import {PrestataireModel} from "./PrestataireModel";
import {DevisModel} from "./DevisModel";

export class DevisPropositionModel{
  _id : string;
  prestataire : PrestataireModel;
  prix : number;
  dateProposee : Date;
  date : Date;

}
