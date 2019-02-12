import {PrestataireModel} from "./PrestataireModel";
import {TypePrixEnum} from "../Enums/TypePrixEnum";
import {TypePrestationSpecialiseeEnum} from "../Enums/TypePrestationSpecialiseeEnum";

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
  typePrestationSpecialisee : TypePrestationSpecialiseeEnum;

}
