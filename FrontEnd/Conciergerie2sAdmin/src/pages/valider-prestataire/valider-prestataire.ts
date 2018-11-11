import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PrestataireProvider} from "../../providers/prestataire/prestataire";
import {StatusEnum} from "../../model/Enums/StatusEnum";
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

  public prestataires : UserModel [];

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public prestatairePvd : PrestataireProvider
    , public alertCtrl : AlertController) {
    this.getAllPrestataire();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ValiderPrestatairePage');
  }

  getAllPrestataire(){
    this.prestatairePvd.getAllUtilisateurPrestataire().subscribe((results) =>{
      this.prestataires = results.data;
      console.log(this.prestataires);
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
    console.log("Valider prestataire");
    this.prestatairePvd.valider(element).subscribe((result) =>{
      this.manageSuccessErrorValiderPrestataire(result);
    })
  }

  devaliderPrestataire(element){
    this.prestatairePvd.devalider(element).subscribe((result) =>{
      this.manageSuccessErrorDevaliderPrestataire(result);
    })
  }

  manageSuccessErrorValiderPrestataire(result){
    if(result.success){
      this.alertCtrl.create({
        title: "Validation du prestataire",
        subTitle : "La validation s'est correctement effectuée"
      }).present();
    }
    else{
      this.alertCtrl.create({
        title : "Erreur",
        subTitle : "Une erreur est survenue. Veuillez contacter le service technique"
      }).present()
    }
  }

  manageSuccessErrorDevaliderPrestataire(result){
    if(result.success){
      this.alertCtrl.create({
        title: "Dévalidation du prestataire",
        subTitle : "La dévalidation s'est correctement effectuée"
      }).present();
    }
    else{
      this.alertCtrl.create({
        title : "Erreur",
        subTitle : "Une erreur est survenue. Veuillez contacter le service technique"
      }).present()
    }
  }


}
