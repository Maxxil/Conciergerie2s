import { PrestationModel } from "../Models/PrestationModel";

export class PrestationResult {
  success: boolean;
  error: Error;
  data : PrestationModel[];
  filename : string = "";
}
