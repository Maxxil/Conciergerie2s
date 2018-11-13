import {ServiceModel} from "../Model/ServiceModel";

export class ServiceResult{
  success : boolean;
  error : ErrorEnum;
  data : ServiceModel;
}
