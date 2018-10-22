import { ServiceModel } from '../Models/ServiceModel';
export class ServiceResult {
  success: boolean;
  error: Error;
  data : ServiceModel[];
}
