import {UtilisateurModel} from "./UtilisateurModel";

export class NotificationModel{    
    utilisateur : UtilisateurModel;    
    status : string;
    message: string;
    type: number;
    refId: string;
    date : Date;
    _id: string;
    icon: String;
    readBy: UtilisateurModel[];
    archiveBy: UtilisateurModel[];

}
