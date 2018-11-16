import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeForfaitPage} from "../commande-forfait/commande-forfait";
import {CommandeHorairePage} from "../commande-horaire/commande-horaire";
import {DevisPage} from "../devis/devis";

/**
 * Generated class for the CommandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande',
  templateUrl: 'commande.html',
})
export class CommandePage {

  tab1Root = CommandeForfaitPage;
  tab2Root = CommandeHorairePage;
  tab3Root = DevisPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
