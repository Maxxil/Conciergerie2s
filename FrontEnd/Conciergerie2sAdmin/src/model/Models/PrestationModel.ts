export class PrestationModel{
  _id : string;
  nom : string;
  image : string;
  description: string;
  prix: string;
  typeprix: string;
  forfait:string;
  prestataires : object[];
  details: string[];
}
