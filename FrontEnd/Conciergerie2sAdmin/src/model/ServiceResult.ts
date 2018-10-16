import { ServiceModel } from './ServiceModel';
export class ServiceResult {
  success: boolean;
  error: Error;
  data : ServiceModel[];
}
