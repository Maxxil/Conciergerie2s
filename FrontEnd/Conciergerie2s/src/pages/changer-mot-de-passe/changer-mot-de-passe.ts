import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChangerMotDePasseProvider} from "../../providers/changer-mot-de-passe/changer-mot-de-passe";
import {LoginPage} from "../login/login";

/**
 * Generated class for the ChangerMotDePassePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changer-mot-de-passe',
  templateUrl: 'changer-mot-de-passe.html',
})
export class ChangerMotDePassePage {

  public ancienMotDePasse : string = '';
  public nouveauMotDePasse: string = "";
  public confirmationNouveauMotDePasse : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public changerMotDePassePvd : ChangerMotDePasseProvider,
              private alertCtrl : AlertController ) {
  }

  public envoyer(){
    /*
    if(this.ancienMotDePasse == this.nouveauMotDePasse){
      this.alertCtrl.create({
        title : 'Erreur',
        message : "Le nouveau mot de passe est similaire à l'ancien"
      }).present();
    }
    if(this.nouveauMotDePasse != this.confirmationNouveauMotDePasse){
      this.alertCtrl.create({
        title : 'Erreur',
        message : "La confirmation du mot de passe est differente du nouveau mot de passe"
      }).present();
    }
    if(this.nouveauMotDePasse == this.confirmationNouveauMotDePasse){
      this.changerMotDePassePvd.changerMotDePasse(this.ancienMotDePasse, this.nouveauMotDePasse).subscribe((result) =>{
        if(result.success){
          this.alertCtrl.create({
            title : 'Confirmation',
            message : "Votre mot de passe a été correctement ",
            buttons : [{
              text : 'OK',
              handler : () =>{
                this.navCtrl.push(LoginPage);
              }
            }]
          }).present();
        }
        else{
          this.alertCtrl.create({
            title : 'Erreur',
            message : "Une erreur est survenue."
          }).present();
        }
      })
    }
    */
  }

}
