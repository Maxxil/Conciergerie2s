import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeForfaitModel} from "../../model/Models/CommandeForfaitModel";
import {CommandeForfaitProvider} from "../../providers/commande-forfait/commande-forfait";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";

/**
 * Generated class for the CommandeForfaitDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-forfait-detail',
  templateUrl: 'commande-forfait-detail.html',
})
export class CommandeForfaitDetailPage {

  public commande : CommandeForfaitModel;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public commandePvd : CommandeForfaitProvider) {
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
