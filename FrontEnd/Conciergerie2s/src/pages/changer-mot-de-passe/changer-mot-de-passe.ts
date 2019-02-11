import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChangerMotDePasseProvider} from "../../providers/changer-mot-de-passe/changer-mot-de-passe";

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

  public confirmationMotDePasse : string = "";
  public motDePasse : string = "";
  public ancienMotDePasse : string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl : AlertController, public changerMotDePassePvd : ChangerMotDePasseProvider) {
  }

  ionViewDidLoad() {    
  }

  public send(){    
    if(this.motDePasse == this.ancienMotDePasse){
      this.alertCtrl.create({
        title : 'Erreur',
        message : "Votre ancien mot de passe doit être different de l'ancien",
        buttons : [{
          text : 'OK'
        }]
      }).present();
    }
    else if(this.motDePasse != this.confirmationMotDePasse){
      this.alertCtrl.create({
        title : 'Erreur',
        message : "La confirmation du mot de passe est different du mot de passe",
        buttons : [{
          text : 'OK'
        }]
      }).present();
    }
    else{
      this.changerMotDePassePvd.changerMotDePasseDepuisProfile(this.ancienMotDePasse, this.motDePasse).subscribe((result) =>{
        if(result.success){
          this.alertCtrl.create({
            title : 'Succés',
            message : "Votre mot de passe a été modifié avec succés",
            buttons : [{
              text : 'OK'
            }]
          }).present();
        }
        else{
          this.alertCtrl.create({
            title : 'Erreur',
            message : "Une erreur s'est produite. Veuillez contacter le service technique ou réessayer.",
            buttons : [{
              text : 'OK'
            }]
          }).present();
        }
      })
    }
  }

}
