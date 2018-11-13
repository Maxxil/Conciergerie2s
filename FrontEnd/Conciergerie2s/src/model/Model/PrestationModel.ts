import {PrestataireModel} from "./PrestataireModel";

export class PrestationModel{
  _id : string;
  nom : string;
  image : string;
  description: string;
  prix: string;
  typeprix: string;
  prestataires : PrestataireModel[];
  forfait:string;
  details: string[];
}
