import {UtilisateurModel} from "../Model/UtilisateurModel";

export class UtilisateurResult{
  success: boolean;
  error: Error;
  data : UtilisateurModel[];
}
