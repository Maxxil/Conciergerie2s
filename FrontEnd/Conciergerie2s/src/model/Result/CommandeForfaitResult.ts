import {CommandeForfaitModel} from "../Model/CommandeForfaitModel";

export class CommandeForfaitResult{
  success : boolean;
  error : ErrorEnum;
  data : CommandeForfaitModel[];
}
