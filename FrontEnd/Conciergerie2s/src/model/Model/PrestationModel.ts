import {PrestataireModel} from "./PrestataireModel";
import {TypePrixEnum} from "../Enums/TypePrixEnum";

export class PrestationModel{
  _id : string;
  nom : string;
  image : string;
  description: string;
  prix: number;
  typeprix: TypePrixEnum;
  prestataires : PrestataireModel[];
  forfait:string;
  details: string[];
}
