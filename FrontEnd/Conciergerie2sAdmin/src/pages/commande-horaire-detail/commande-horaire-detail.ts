import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeHoraireModel} from "../../model/Models/CommandeHoraireModel";
import {CommandeHoraireProvider} from "../../providers/commande-horaire/commande-horaire";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";

/**
 * Generated class for the CommandeHoraireDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-horaire-detail',
  templateUrl: 'commande-horaire-detail.html',
})
export class CommandeHoraireDetailPage {

  public commande : CommandeHoraireModel;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public commandePvd : CommandeHoraireProvider) {
    console.log("Commande horaire détail");
    this.commande = this.navParams.get('Commande');
    console.log(this.commande);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandeHoraireDetailPage');
  }

  public validerCommande(){
    this.commandePvd.validateCommande(this.commande).subscribe(result =>{
      if(result.success){
        this.commande.status = CommandeStatus.VALIDEE;
      }
    });

  }

  isEnCours(){
    return this.commande.status == CommandeStatus.EN_COURS_ANALYSE || this.commande.status == CommandeStatus.EN_COURS_VALIDATION;
  }

}
