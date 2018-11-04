import { UserModel } from './../Models/UserModel';
import { LoginModel } from "../Models/LoginModel"

export class PrestataireResult{
  success: boolean;
  error: Error;
  data : UserModel[];
}
