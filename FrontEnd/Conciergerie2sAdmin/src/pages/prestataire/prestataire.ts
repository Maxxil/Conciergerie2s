import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PrestationProvider} from "../../providers/prestation/prestation";
import {PrestationInformationModel} from "../../model/Models/PrestationInformationModel";

/**
 * Generated class for the PrestatairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prestataire',
  templateUrl: 'prestataire.html',
})
export class PrestatairePage {

  private id : string;
  public prestation : PrestationInformationModel;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public prestationPvd : PrestationProvider) {
    this.id = navParams.get('IdPrestation');
    console.log(this.id);
    this.getPrestationByIdWithPrestataires();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrestatairePage');
  }

  getPrestationByIdWithPrestataires(){
    this.prestationPvd.getPrestationByIdWithPrestataires(this.id).subscribe(result =>{
      console.log(result);
      this.prestation = result.data[0];
    });
  }

}
