
import {CommandeHoraireModel} from "../Models/CommandeHoraireModel";

export class CommandeHoraireResult{
  success : boolean;
  error : ErrorEnum;
  data : CommandeHoraireModel[];
}
