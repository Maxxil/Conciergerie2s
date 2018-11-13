import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginModel} from "../../model/Model/LoginModel";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  isPasswordToUpdate: boolean = false;
  profile: LoginModel;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profile = navParams.get("profile");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
