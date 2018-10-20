import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginModel} from './../../model/LoginModel';
import {TabsPage} from "../tabs/tabs";
import {SigninPage} from '../signin/signin';

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

  public login: LoginModel;
  constructor(
    public navCtrl: NavController
    , public navParams: NavParams) {
    this.login = new LoginModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  connect(){
    this.navCtrl.push(TabsPage, {profile: {nom: "KADI", prenom: "Massil", email: "massilkadi@gmail.com"}});
  }

  facebookConnect(){

  }

  signin(){
    this.navCtrl.push(SigninPage);
  }

}
