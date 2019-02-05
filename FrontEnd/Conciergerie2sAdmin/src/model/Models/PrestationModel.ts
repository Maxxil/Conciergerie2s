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
  typePrestationSpecialisee : TypePrestationSpecialiseeEnum;
  prestataire : PrestataireModel[];
  forfait:string;
  details: string[];

  constructor(){
    this.nom = "";
    this.description = "";
    this.prix = 1;
    this.forfait = "";
    this.details = [];
    this.typeprix=TypePrixEnum.DEVIS;
    this.typePrestationSpecialisee = 0;
    this.image = "../../assets/icon/pic.png";
  }


}
