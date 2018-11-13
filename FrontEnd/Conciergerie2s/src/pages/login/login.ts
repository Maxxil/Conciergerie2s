import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginModel} from '../../model/Model/LoginModel';
import {TabsPage} from "../tabs/tabs";
import {SigninPage} from '../signin/signin';
import {LoginProvider} from "../../providers/login/login";
import {UtilisateurModel} from "../../model/Model/UtilisateurModel";

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

  public login: UtilisateurModel;
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public loginPvd : LoginProvider
              , public alertCtrl : AlertController) {
    this.login = new UtilisateurModel();
    this.tryConnect();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  tryConnect(){
    var promise = this.loginPvd.tryConnect();
    if(promise != null){
      promise.subscribe((result) => {
        if(result.success){
          this.navCtrl.push(TabsPage);
        }
      })
    }
  }

  connect(){
    this.loginPvd.connect(this.login)
      .subscribe((result) => {
        console.log(result);
        if(result == null || !result.success )
        {
          this.login.motDePasse = "";
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
          localStorage.setItem('Token', result.data);
          this.navCtrl.push(TabsPage);
        }
      });
  }

  facebookConnect(){

  }

  signin(){
    this.navCtrl.push(SigninPage);
  }

}
