import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PrestataireProvider} from "../../providers/prestataire/prestataire";
import {StatusEnum} from "../../model/Enums/StatusEnum";
import {PrestataireModel} from "../../model/Models/PrestataireModel";

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

  public prestataires : PrestataireModel [];
  public adminPrestataires : PrestataireModel [];
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
      console.log(results);
       this.prestataires = results.data.filter(item => {
        return item.role == 2
      });
     /* this.adminPrestataires =  results.data.filter(item => {     
        return item.role == 3
      });*/  

      //this.prestataires = this.adminPrestataires = results.data;
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
      this.manageSuccessErrorValiderPrestataire(result,element);
    })
  }

  devaliderPrestataire(element){
    this.prestatairePvd.devalider(element).subscribe((result) =>{
      this.manageSuccessErrorDevaliderPrestataire(result,element);
    })
  }

  manageSuccessErrorValiderPrestataire(result,prestataire : PrestataireModel){
    if(result.success){
      this.alertCtrl.create({
        title: "Validation du prestataire",
        subTitle : "La validation s'est correctement effectuée",
        buttons: [{
          text : 'OK'
        }]
      }).present();
    }
    else{
      this.alertCtrl.create({
        title : "Erreur",
        subTitle : "Une erreur est survenue. Veuillez contacter le service technique",
        buttons: [{
          text : 'OK'
        }]
      }).present()
    }
  }

  manageSuccessErrorDevaliderPrestataire(result,prestataire : PrestataireModel){
    if(result.success){
      this.alertCtrl.create({
        title: "Dévalidation du prestataire",
        subTitle : "La dévalidation s'est correctement effectuée"
      }).present();
      prestataire.utilisateur.status = StatusEnum.EN_ATTENTE_VALIDATION;
    }
    else{
      this.alertCtrl.create({
        title : "Erreur",
        subTitle : "Une erreur est survenue. Veuillez contacter le service technique"
      }).present()
    }
  }


}
