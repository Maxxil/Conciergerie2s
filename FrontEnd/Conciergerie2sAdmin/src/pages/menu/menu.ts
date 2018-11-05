import { AddPrestationPage } from './../add-prestation/add-prestation';
import { AddServicePage } from './../add-service/add-service';
import { ServicePage } from './../service/service';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import {PrestationPage} from "../prestation/prestation";
import {LinkServicePrestationPage} from "../link-service-prestation/link-service-prestation";
import {ValiderPrestatairePage} from "../valider-prestataire/valider-prestataire";
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  public rootPage : Page= DashboardPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPageHome(){
    this.rootPage = DashboardPage;
  }

  openPageService(){
    this.rootPage = ServicePage;
  }

  openPageDashboard(){
    this.rootPage = DashboardPage;
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

  openPageLierServicePrestation(){
    this.rootPage = LinkServicePrestationPage;
  }

  openPageValiderPrestataire(){
    this.rootPage = ValiderPrestatairePage;
  }

  openPageCommandes(){

  }

  openPageDevis(){

  }
}
