export class PrestationInformationModel{
  _id : string;
  nom : string;
  image : string;
  description: string;
  prix: string;
  typeprix: string;
  prestataires : [{
    _id: string,
    prix : number,
    utilisateur : {
      nom : string,
      prenom : string
    }
  }];
}
