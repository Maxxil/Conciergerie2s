import {UtilisateurModel} from "./UtilisateurModel";
import {PrestationModel} from "./PrestationModel";
import {CommandeStatus} from "../CommandeStatusEnum";
import {DevisPropositionModel} from "./DevisPropositionModel";

export class DevisModel{
  _id : string;
  idClient : string;
  client: UtilisateurModel;
  idPrestation : string;
  prestation : PrestationModel;
  propositions : DevisPropositionModel[];
  information : string;
  heure : string;
  date : Date;
  status : CommandeStatus;

}
