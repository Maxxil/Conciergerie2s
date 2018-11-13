import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PrestationModel} from "../../model/Model/PrestationModel";
import {PrestationProvider} from "../../providers/prestation/prestation";

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

  public prestation : PrestationModel;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public prestationPvd : PrestationProvider) {
    this.prestation = this.navParams.get('Prestation');
    this.getPrestationWithPrestataire();
  }

  public getPrestationWithPrestataire(){
    this.prestationPvd.getWithPrestataires(this.prestation._id).subscribe(result =>{
      this.prestation = result.data[0];
    })
  }

}
