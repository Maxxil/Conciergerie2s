import { RoleEnum } from "../Enums/RoleEnum";
import { StatusEnum } from "../Enums/StatusEnum";

export class UtilisateurModel{
    _id: string;
    nom: string;
    prenom: string;
    nomUtilisateur: string;
    motDePasse: string;
    image : string;
    confirmationMotDePasse: string;
    role: RoleEnum;
    status: StatusEnum;
    addresse : string;
    telephoneMobile : string;
    telephoneFix : string;
    email : string;
    historique : object[];
    siret : string;
    entreprise : string;

    constructor(){

    }
}
