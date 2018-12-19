import {DevisPropositionModel} from "../Model/DevisPropositionModel";

export class DevisPropositionResult{
  success : boolean;
  error : ErrorEnum;
  data : DevisPropositionModel[];
}
