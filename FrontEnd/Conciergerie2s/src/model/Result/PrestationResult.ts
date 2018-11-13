import {PrestationModel} from "../Model/PrestationModel";

export class PrestationResult{
  success : boolean;
  error : ErrorEnum;
  data : PrestationModel;
}
