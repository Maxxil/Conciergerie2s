import {PrestationInformationModel} from "../Models/PrestationInformationModel";

export class PrestationInformationResult{
  success : boolean;
  error : number;
  data : PrestationInformationModel[];
}
