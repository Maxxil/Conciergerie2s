import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {LoginModel} from "../../model/Model/LoginModel";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {UtilisateurModel} from "../../model/Model/UtilisateurModel";
import {RoleEnum} from "../../model/Enums/RoleEnum";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public login: LoginModel;
  public user : UtilisateurModel;
  public confirmationMotDePasse : string;
  public roleEnum : RoleEnum;
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public utilisateurPvd : UtilisateurProvider,
              public viewCtrl : ViewController,
              public alertCtrl : AlertController) {
    this.login = new LoginModel();
    this.user = new UtilisateurModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  verifyInput(){
    if(this.user.nom == "" || this.user.nom == null){
      this.alertCtrl.create({
        title : 'Erreur',
        message : 'Vous devez saisir un nom',
        buttons : [{
          text : 'OK'
        }]
      }).present();
      return false;

    }

    if(this.user.prenom == ""){
      this.alertCtrl.create({
        title : 'Erreur',
        message : 'Vous devez saisir un prenom',
        buttons : [{
          text : 'OK'
        }]
      }).present();
      return false;

    }

    if(this.user.email == "" || this.user.email == null){
      this.alertCtrl.create({
        title : 'Erreur',
        message : 'Vous devez saisir un email',
        buttons : [{
          text : 'OK'
        }]
      }).present();
      return false;

    }
    if(this.user.motDePasse == null || this.user.motDePasse == ""){
      this.alertCtrl.create({
        title : 'Erreur',
        message : 'Vous devez saisir un mot de passe',
        buttons : [{
          text : 'OK'
        }]
      }).present();
      return false;

    }

    if(this.user.role == 0){
      this.alertCtrl.create({
        title : 'Erreur',
        message : 'Vous devez saisir un role',
        buttons : [{
          text : 'OK'
        }]
      }).present();
      return false;

    }

    if(this.user.nomUtilisateur == "" ){
      this.alertCtrl.create({
        title : 'Erreur',
        message : 'Vous devez saisir un nom utilisateur',
        buttons : [{
          text : 'OK'
        }]
      }).present();
      return false;

    }


    return true;
  }

  signin(){
    if(this.verifyInput())
    {
      console.log(this.user);
      this.utilisateurPvd.add(this.user).subscribe((result) =>{
        if(result.success){
          var alert = this.alertCtrl.create({
            title : "Succés",
            message : "Vous avez été inscrits correctement.",
            buttons : [
              {
                text : 'OK',
                handler : () =>{
                  this.viewCtrl.dismiss();
                }
              }
            ]
          });
          alert.present();
        }
        else{
          this.alertCtrl.create({
            title: 'Erreur',
            message :"L'utilisateur que vous essayer d'inscrire existe déjà. Essayer avec un nouvel email et nouveau nom d'utilisateur",
            buttons: [
              {
                text: 'OK'
              }
            ]
          }).present();
        }
      });

    }
  }

}
