import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DevisModel} from "../../model/Models/DevisModel";
import {DevisProvider} from "../../providers/devis/devis";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";
import {DevisPropositionModel} from "../../model/Models/DevisPropositionModel";

/**
 * Generated class for the DevisDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devis-detail',
  templateUrl: 'devis-detail.html',
})
export class DevisDetailPage {

  public commande : DevisModel;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public commandePvd : DevisProvider) {
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
