import { NotificationModel} from "../Model/NotificationModel";

export class NotificationResult {
  success: boolean;
  error: Error;
  data : NotificationModel[];
  total: number;
}
