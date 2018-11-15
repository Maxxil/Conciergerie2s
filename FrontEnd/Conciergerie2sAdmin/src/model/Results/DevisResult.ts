import {DevisModel} from "../Models/DevisModel";

export class DevisResult{
  success : boolean;
  error : ErrorEnum;
  data : DevisModel[];
}
