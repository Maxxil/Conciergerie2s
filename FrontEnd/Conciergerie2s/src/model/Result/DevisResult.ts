import {DevisModel} from "../Model/DevisModel";

export class DevisResult{
  success : boolean;
  error : ErrorEnum;
  data : DevisModel[];
}
