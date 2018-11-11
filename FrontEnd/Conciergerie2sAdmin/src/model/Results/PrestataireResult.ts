import {PrestataireModel} from "../Models/PrestataireModel";
import {UserModel} from "../Models/UserModel";

export class PrestataireResult{
  success: boolean;
  error: Error;
  data : PrestataireModel[];
}
