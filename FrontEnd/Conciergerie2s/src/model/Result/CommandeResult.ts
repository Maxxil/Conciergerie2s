import {CommandeSpecialiseeModel} from "../Model/CommandeSpecialiseeModel";
import {CommandeForfaitModel} from "../Model/CommandeForfaitModel";
import {DevisModel} from "../Model/DevisModel";
import {DevisPropositionModel} from "../Model/DevisPropositionModel";

export class CommandeResult{
  success : boolean;
  error : ErrorEnum;
  data : {
    commandeSpecialisee : CommandeSpecialiseeModel[],
    commandeForfait : CommandeForfaitModel[],
    devis : DevisModel[],
    devisProposition : DevisPropositionModel[];
  }
}
