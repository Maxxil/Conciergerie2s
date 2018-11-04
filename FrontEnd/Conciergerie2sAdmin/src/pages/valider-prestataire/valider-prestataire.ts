import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PrestataireProvider} from "../../providers/prestataire/prestataire";
import {StatusEnum} from "../../model/Enums/StatusEnum";
import {PrestationProvider} from "../../providers/prestation/prestation";
import {UserModel} from "../../model/Models/UserModel";

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

  public prestataires : UserModel[];

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public prestatairePvd : PrestataireProvider
    , public  prestationPvd : PrestationProvider) {
    this.getAllPrestataire();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValiderPrestatairePage');
  }

  getAllPrestataire(){
    this.prestatairePvd.getAllPrestataire().subscribe((results) =>{
      this.prestataires = results.data;
    })
  }

  displayPrestataire(element){

  }

  estValidePrestataire(status){
    if(status == StatusEnum.VALIDE){
      return true;
    }
    return false;
  }

  validerPrestataire(element){
    this.prestatairePvd.valider(element).subscribe((result) =>{

    })
  }

  devaliderPrestataire(element){
    this.prestatairePvd.devalider(element).subscribe((result) =>{

    })
  }


}
