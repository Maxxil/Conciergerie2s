import { PrestationModel } from './PrestationModel';
export class PrestationResult {
  success: boolean;
  error: Error;
  data : PrestationModel[];
}
