import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, Platform} from 'ionic-angular';
import {Page} from "ionic-angular/umd/navigation/nav-util";
import {TabsPage} from "../tabs/tabs";
import {CommandesPage} from "../commandes/commandes";
import {LoginPage} from "../login/login";
import {CommandesPostulerPage} from "../commandes-postuler/commandes-postuler";
import {ProfilePage} from "../profile/profile";
import { ChatService } from "../../providers/chat/chat-service";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {UtilisateurModel} from "../../model/Model/UtilisateurModel";
import {SERVER_URL} from "../../model/Url";
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  public rootPage : Page= TabsPage;
  public peutPostuler = false;
  public serveurURL : string = "";
  constructor(public utilisateurPvd : UtilisateurProvider,public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private chatService: ChatService) {
    this.utilisateurPvd.getByCurrentId().subscribe(result =>{     
      let profile = result.data[0];
    if(profile) {
        this.peutPostuler = profile.role == 2;
    }
      
    });
    this.serveurURL = SERVER_URL;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPageHome(){
    this.rootPage = TabsPage;
  }

  openPagePostulerCommandes(){
    this.rootPage = CommandesPostulerPage;
  }

  openPageMesCommandes(){
    this.rootPage = CommandesPage;
  }

  openPageProfile(){
    this.rootPage = ProfilePage;
  }

  sendPush() {
    
  }

  deconnecter(){
    this.chatService.logout(); 
    localStorage.removeItem('IdUtilisateur');    
    localStorage.removeItem('Token');
    this.navCtrl.push(LoginPage);
    this.platform.exitApp();
  }
}
