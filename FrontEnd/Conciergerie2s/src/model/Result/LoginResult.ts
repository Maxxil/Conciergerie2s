import {UtilisateurModel} from "../Model/UtilisateurModel";

export class LoginResult{
  success: boolean;
  error: Error;
  data : string;
  user : UtilisateurModel[];
}
