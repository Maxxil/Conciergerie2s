import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import {UtilisateurModel} from "../../model/Models/UtilisateurModel";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public user: UtilisateurModel;
  constructor(
     public navCtrl: NavController
    ,public navParams: NavParams
    ,public loginProvider: LoginProvider
    ,public alertCtrl: AlertController) {
      this.user = new UtilisateurModel();
      this.tryConnect();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  tryConnect(){
    var promise = this.loginProvider.tryConnect();
    if(promise != null){
      promise.subscribe((result) => {
        if(result.success){
          localStorage.setItem("IdUtilisateur" , result.user[0]._id);
          
          this.navCtrl.push(MenuPage);
        }
      })
    }

  }

  connect(){
    this.loginProvider.connect(this.user)
    .subscribe((result) => {
      console.log(result);
      if(result == null || !result.success )
      {
        this.user.motDePasse = "";
        let modal = this.alertCtrl.create({
          title: "Erreur",
          message: "Le login ou le mot de passe est incorrect.",
          buttons : ['OK']
        });
        modal.present();
      }
      else
      {
        console.log(result.data);        
        localStorage.setItem("IdUtilisateur" , result.user[0]._id);
        localStorage.setItem('Token', result.data);
        this.navCtrl.push(MenuPage);
      }
    });
  }

}
