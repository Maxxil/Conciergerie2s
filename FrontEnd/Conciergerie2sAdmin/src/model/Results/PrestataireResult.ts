import { UserModel } from './../Models/UserModel';
import { LoginModel } from "../Models/LoginModel";

export class LoginResult{
  success: boolean;
  error: Error;
  data : UserModel[];
}
