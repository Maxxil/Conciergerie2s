import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginModel} from "../../model/LoginModel";
import {TabsPage} from "../tabs/tabs";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.login = new LoginModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  signin(){
    this.navCtrl.push(TabsPage, {profile: this.login});
  }

}
