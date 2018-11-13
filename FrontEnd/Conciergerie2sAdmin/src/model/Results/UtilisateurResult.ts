import {UtilisateurModel} from "../Models/UtilisateurModel";

export class UtilisateurResult {
  success: boolean;
  error: Error;
  data : UtilisateurModel[];
}
