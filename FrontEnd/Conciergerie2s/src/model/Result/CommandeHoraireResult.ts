import {CommandeHoraireModel} from "../Model/CommandeHoraireModel";

export class CommandeHoraireResult{
  success : boolean;
  error : ErrorEnum;
  data : CommandeHoraireModel[];
}
