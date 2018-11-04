import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PrestataireProvider} from "../../providers/prestataire/prestataire";
import {UtilisateurModel} from "../../../../Conciergerie2s/src/model/UtilisateurModel";

/**
 * Generated class for the ValiderPrestatairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-valider-prestataire',
  templateUrl: 'valider-prestataire.html',
})
export class ValiderPrestatairePage {

  public prestataires : UtilisateurModel[];

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public prestatairePvd : PrestataireProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValiderPrestatairePage');
  }

  getAllPrestataire(){
    this.prestatairePvd.getAllPrestataire().subscribe((results) =>{
      this.prestataires = results.data;
    })
  }

}
