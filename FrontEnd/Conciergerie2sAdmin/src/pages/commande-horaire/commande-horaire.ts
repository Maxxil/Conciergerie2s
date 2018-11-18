import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeHoraireModel} from "../../model/Models/CommandeHoraireModel";
import {CommandeHoraireProvider} from "../../providers/commande-horaire/commande-horaire";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";

/**
 * Generated class for the CommandeHorairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-horaire',
  templateUrl: 'commande-horaire.html',
})
export class CommandeHorairePage {

  public commande : CommandeHoraireModel[];

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public commandePvd : CommandeHoraireProvider) {
    this.getAll();
  }

  public getAll(){
    this.commandePvd.getAll().subscribe(result =>{
      console.log(result);
      if(result.success){
        this.commande = result.data;
      }
    })
  }

  isEnCours(commande){
    return commande.status == CommandeStatus.EN_COURS_ANALYSE || commande.status == CommandeStatus.EN_COURS_VALIDATION;
  }

  /**
   * 
   * @param commande Validation de la commande avec C2S
   */
  public validerCommande(commande : CommandeHoraireModel){
    this.commandePvd.validateCommande(commande).subscribe(result =>{
      if(result.success){
        commande.status = CommandeStatus.VALIDEE;
      }
    });
  }


}
