import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";

export class DevisModel{
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  information : string;
  heure : string;
  date : Date;
}
