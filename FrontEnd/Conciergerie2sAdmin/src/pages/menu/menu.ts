import { AddPrestationPage } from './../add-prestation/add-prestation';
import { AddServicePage } from './../add-service/add-service';
import { ServicePage } from './../service/service';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, Events } from 'ionic-angular';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import {PrestationPage} from "../prestation/prestation";
import {LinkServicePrestationPage} from "../link-service-prestation/link-service-prestation";
import {ValiderPrestatairePage} from "../valider-prestataire/valider-prestataire";
import { DashboardPage } from '../dashboard/dashboard';
import {LinkPrestatairePrestataionPage} from "../link-prestataire-prestataion/link-prestataire-prestataion";
import {LoginPage} from "../login/login";
import {UtilisateurPage} from "../utilisateur/utilisateur";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {CommandePage} from "../commande/commande";
import {ProfilePage} from "../profile/profile";
import { ChatService } from "../../providers/chat/chat-service";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
  animations : [ trigger(
      'openClose', [
        state('open', style({})),
        state('close' , style({})),
        transition('open => close', [animate('1s')]),
        transition('close => open' , [animate('1s')])
      ]
  )]
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;
  public rootPage : Page= DashboardPage;
  public isDisplayAfficher : boolean = false;
  public isDisplayAjouter : boolean = false;
  public isDisplayLink : boolean = false;
  public isDisplayValider : boolean = false;
  public isDisplaySettings : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private chatService: ChatService, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openSubMenuValider(){
    this.isDisplayValider = !this.isDisplayValider;
  }

  openSubMenuLink(){
    this.isDisplayLink = !this.isDisplayLink;
  }

  openSubMenuAFfichage(){
    this.isDisplayAfficher = !this.isDisplayAfficher;
  }

  openSubMenuAjouter(){
    this.isDisplayAjouter = !this.isDisplayAjouter;
  }

  openSubMenuSettings(){
    this.isDisplaySettings= !this.isDisplaySettings;
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

  openPageLierPrestationPrestataire(){
    this.rootPage = LinkPrestatairePrestataionPage;
  }

  openPageCommandes(){
    this.rootPage = CommandePage;
  }

  openPageUtilisateur(){
    this.rootPage = UtilisateurPage;
  }

  openPageProfile(){
    this.rootPage = ProfilePage;
  }

  testNotificationEvent() {
    this.events.publish('notification:updated') ; 
    
  }

  deconnecter(){
    this.chatService.logout(); 
    localStorage.removeItem('Token');
    this.navCtrl.push(LoginPage);
  }
}
