import {PrestataireModel} from "./PrestataireModel";

export class DevisPropositionModel{
  _id : string;
  prestataire : PrestataireModel;
  prix : number;
  dateProposee : Date;
  date : Date;

}
