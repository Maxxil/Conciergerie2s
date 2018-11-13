import {PrestataireModel} from "../Models/PrestataireModel";

export class PrestataireResult{
  success: boolean;
  error: Error;
  data : PrestataireModel[];
}
