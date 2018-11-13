import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilisateurModel} from "../../model/Models/UtilisateurModel";

/**
 * Generated class for the UtilisateurDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-utilisateur-detail',
  templateUrl: 'utilisateur-detail.html',
})
export class UtilisateurDetailPage {

  public utilisateur : UtilisateurModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.utilisateur = this.navParams.get('Utilisateur');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilisateurDetailPage');
  }

}
