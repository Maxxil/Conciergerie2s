import { AddPrestationPage } from './../add-prestation/add-prestation';
import { AddServicePage } from './../add-service/add-service';
import { ServicePage } from './../service/service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import {PrestationPage} from "../prestation/prestation";

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

  public rootPage : Page= ServicePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPageHome(){
    this.rootPage = ServicePage;
  }

  openPageAddService(){
    this.rootPage = AddServicePage;
  }

  openPageAddPrestation(){
    this.rootPage = AddPrestationPage;
  }

  openPrestationPage(){
    this.rootPage = PrestationPage;
  }

}