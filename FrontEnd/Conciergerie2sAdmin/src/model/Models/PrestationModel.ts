import {PrestataireModel} from "./PrestataireModel";
import {TypePrixEnum} from "../Enums/TypePrixEnum";

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

  constructor(){
    this.nom = "";
    this.description = "";
    this.prix = "";
    this.forfait = "";
    this.typeprix
    this.details = [];
    this.typeprix=TypePrixEnum.HEURE;
    this.image = "../../assets/icon/pic.png";
  }
}
