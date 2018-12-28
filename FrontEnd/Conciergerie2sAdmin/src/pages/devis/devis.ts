import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DevisModel} from "../../model/Models/DevisModel";
import {DevisProvider} from "../../providers/devis/devis";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";
import {DevisDetailPage} from "../devis-detail/devis-detail";
import {DevisPropositionModel} from "../../model/Models/DevisPropositionModel";
import { PRESTATION_IMAGE_URL } from './../../model/Url';
/**
 * Generated class for the DevisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devis',
  templateUrl: 'devis.html',
})
export class DevisPage {

  public commandes : DevisModel[];
  public propositions : DevisPropositionModel[];
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public commandePvd : DevisProvider) {
    this.getAll();
  }

  public getAll() {
    this.commandePvd.getAll().subscribe(result => {
      if (result.success) {
        console.log(result.success);
        this.commandes = result.data;
        console.log(result);
      }
    })
  }

  isEnCours(commande){
    return commande.status == CommandeStatus.EN_COURS_ANALYSE;
  }

  public afficherDetailCommande(commande: DevisModel){
    console.log(commande);
    this.navCtrl.push(DevisDetailPage, {Commande : commande})
  }
}
