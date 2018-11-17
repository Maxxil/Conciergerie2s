import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import {Page} from "ionic-angular/umd/navigation/nav-util";
import {TabsPage} from "../tabs/tabs";
import {CommandesPage} from "../commandes/commandes";
import {LoginPage} from "../login/login";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPageHome(){
    this.rootPage = TabsPage;
  }

  openPageMesCommandes(){
    this.rootPage = CommandesPage;
  }

  deconnecter(){
    localStorage.removeItem('IdUtilisateur');
    localStorage.removeItem('Token');
    this.navCtrl.push(LoginPage);
  }
}
