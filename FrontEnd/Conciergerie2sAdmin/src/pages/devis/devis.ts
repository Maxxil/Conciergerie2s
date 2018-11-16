import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DevisModel} from "../../model/Models/DevisModel";
import {DevisProvider} from "../../providers/devis/devis";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";

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

  public commande : DevisModel[];

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public commandePvd : DevisProvider) {
    this.getAll();
  }

  public getAll() {
    this.commandePvd.getAll().subscribe(result => {
      if (result.success) {
        this.commande = result.data;
      }
    })
  }

  isEnCours(commande){
    return commande.status == CommandeStatus.EN_COURS_ANALYSE;
  }

  public validerCommande(commande : DevisModel){
    this.commandePvd.validateCommande(commande);
  }
}
