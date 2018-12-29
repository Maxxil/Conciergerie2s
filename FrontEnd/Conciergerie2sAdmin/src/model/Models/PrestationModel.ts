import {PrestataireModel} from "./PrestataireModel";
import {TypePrixEnum} from "../Enums/TypePrixEnum";

export class PrestationModel{
  _id : string;
  nom : string;
  image : string;
  description: string;
  prix: number;
  typeprix: TypePrixEnum;
  prestataire : PrestataireModel[];
  forfait:string;
  details: string[];

  constructor(){
    this.nom = "";
    this.description = "";
    this.prix = 1;
    this.forfait = "";
    this.details = [];
    this.typeprix=TypePrixEnum.HEURE;
    this.image = "../../assets/icon/pic.png";
  }


}
