import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SigninPage} from '../signin/signin';
import {LoginProvider} from "../../providers/login/login";
import {UtilisateurModel} from "../../model/Model/UtilisateurModel";
import {MenuPage} from "../menu/menu";
import { Socket } from 'ng-socket-io';
import {MotDePasseOubliePage} from "../mot-de-passe-oublie/mot-de-passe-oublie";
import { UtilisateurProvider } from '../../providers/utilisateur/utilisateur';

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
  private estConnecte : boolean = false;
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public loginPvd : LoginProvider
              , public utilisateurPvd: UtilisateurProvider
              , public alertCtrl : AlertController, public socket: Socket) {
    this.login = new UtilisateurModel();
    var token = localStorage.getItem('Token');
    if(token != null && !this.estConnecte){
      this.tryConnect();
    }
  }

  tryConnect(){
    var promise = this.loginPvd.tryConnect();
    if(promise != null){
      promise.subscribe((result) => {
        console.log(result);
        if(result.success){
          this.estConnecte = true;
          localStorage.setItem("IdUtilisateur" , result.user[0]._id);
          this.socket.emit('client-connect', result.user[0]);
          this.navCtrl.setRoot(MenuPage);
        }
      })
    } else {
      console.log('erreur try connect');
    }
  }

  connect(){
    this.loginPvd.connect(this.login)
      .subscribe((result) => {
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
          this.estConnecte = true;
          let user = result.user[0];
          localStorage.setItem("IdUtilisateur" ,user._id);
          localStorage.setItem('Token', result.data);
          this.socket.emit('client-connect', user);
          this.utilisateurPvd.getByCurrentId().subscribe(result =>{
            let playerId = localStorage.getItem('playerID');
            let profile = result.data[0];
            profile.lastPlayerId = playerId;
            this.utilisateurPvd.updateLastPlayerId(profile);
          });
          this.navCtrl.setRoot(MenuPage);
        }
      });
  }

  facebookConnect(){

  }

  motDePasseOublie(){
    this.navCtrl.push(MotDePasseOubliePage);
  }

  signin(){
    this.navCtrl.setRoot(SigninPage);
  }

}
