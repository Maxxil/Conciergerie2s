import {CommandeHoraireModel} from "../Model/CommandeHoraireModel";
import {CommandeForfaitModel} from "../Model/CommandeForfaitModel";
import {DevisModel} from "../Model/DevisModel";
import {DevisPropositionModel} from "../Model/DevisPropositionModel";

export class CommandeResult{
  success : boolean;
  error : ErrorEnum;
  data : {
    commandeHoraire : CommandeHoraireModel[],
    commandeForfait : CommandeForfaitModel[],
    devis : DevisModel[],
    devisProposition : DevisPropositionModel[];
  }
}
