import { MenuPage } from './../menu/menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginModel } from '../../model/LoginModel';
import { LoginProvider } from '../../providers/login/login';

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
  private login: LoginModel;
  constructor(
     public navCtrl: NavController
    ,public navParams: NavParams
    ,public loginProvider: LoginProvider
    ,public alertCtrl: AlertController) {
      this.login = new LoginModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  connect(){
    this.loginProvider.connect(this.login)
    .subscribe((result) => {
      console.log(result);
      if(result == "" || result == null)
      {
        this.login.password = "";
        let modal = this.alertCtrl.create({
          title: "Erreur",
          message: "Le login ou le mot de passe est incorrect.",
          buttons : ['OK']
        });
        modal.present();
      }
      else
      {
        this.navCtrl.push(MenuPage);
      }
    });
  }

}
