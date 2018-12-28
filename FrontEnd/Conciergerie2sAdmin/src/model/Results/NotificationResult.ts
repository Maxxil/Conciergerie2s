import { NotificationModel} from "../Models/NotificationModel";

export class NotificationResult {
  success: boolean;
  error: Error;
  data : NotificationModel[];
  total: number;
}
