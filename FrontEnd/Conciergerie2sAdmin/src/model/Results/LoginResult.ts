import {UtilisateurModel} from "../Models/UtilisateurModel";

export class LoginResult{
  success: boolean;
  error: Error;
  data : string;
  user : UtilisateurModel;
}
