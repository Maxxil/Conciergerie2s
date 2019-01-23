import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MotDePasseOublieProvider} from "../../providers/mot-de-passe-oublie/mot-de-passe-oublie";
import {ChangerMotDePasseProvider} from "../../providers/changer-mot-de-passe/changer-mot-de-passe";
import {LoginPage} from "../login/login";

/**
 * Generated class for the MotDePasseOubliePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mot-de-passe-oublie',
  templateUrl: 'mot-de-passe-oublie.html',
})
export class MotDePasseOubliePage {

  public email : string;
  public estAutoriseSaisieMotDePasse : boolean = false;
  public code: string;
  public nouveauMotDePasse: string = "";
  public confirmationNouveauMotDePasse : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private motDePasseOubliePvd : MotDePasseOublieProvider,
              private changerMotDePassePvd : ChangerMotDePasseProvider,
              private alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MotDePasseOubliePage');
  }

  envoyer(){
    this.motDePasseOubliePvd.demandeMotDePasseOublie(this.email).subscribe( (result) =>{
      if(result.success){
        this.alertCtrl.create({
          buttons : [
            {
              text : 'OK',

            }
          ],
          title : 'Demande envoyée',
          message : 'Votre demande a bien été envoyé et sera traitée dans les meilleurs délais.'
        }).present();
        this.estAutoriseSaisieMotDePasse = true;
      }
      else{
        this.alertCtrl.create({
          buttons : [
            {
              text : 'OK'
            }
          ],
          title : 'Erreur',
          message : "Une erreur s'est produite. Veuillez contacter le service technique."
        }).present();
      }
    })
  }

  public changerMotDePasse(){
    if(this.nouveauMotDePasse != this.confirmationNouveauMotDePasse){
      this.alertCtrl.create({
        title : 'Erreur',
        message : "La confirmation du mot de passe est differente du nouveau mot de passe"
      }).present();
    }
    if(this.nouveauMotDePasse == this.confirmationNouveauMotDePasse){
      this.changerMotDePassePvd.changerMotDePasse(this.email,this.code, this.nouveauMotDePasse).subscribe((result) =>{
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
  }
}
