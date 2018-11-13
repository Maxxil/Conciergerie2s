import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginModel} from "../../model/Model/LoginModel";
import {TabsPage} from "../tabs/tabs";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {UtilisateurModel} from "../../model/Model/UtilisateurModel";
import {RoleEnum} from "../../../../Conciergerie2sAdmin/src/model/Enums/RoleEnum";

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
  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public utilisateurPvd : UtilisateurProvider) {
    this.login = new LoginModel();
    this.user = new UtilisateurModel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  signin(){
    this.utilisateurPvd.add(this.user).subscribe((result) =>{
      console.log(result);
    });
  }

}
