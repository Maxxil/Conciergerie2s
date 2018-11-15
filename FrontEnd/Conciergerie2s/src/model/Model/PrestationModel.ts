import {PrestataireModel} from "./PrestataireModel";
import {TypePrixEnum} from "../../../../Conciergerie2sAdmin/src/model/Enums/TypePrixEnum";

export class PrestationModel{
  _id : string;
  nom : string;
  image : string;
  description: string;
  prix: string;
  typeprix: TypePrixEnum;
  prestataires : PrestataireModel[];
  forfait:string;
  details: string[];
}
