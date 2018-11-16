import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeHoraireProvider} from "../../providers/commande-horaire/commande-horaire";
import {CommandeForfaitProvider} from "../../providers/commande-forfait/commande-forfait";
import {CommandeForfaitResult} from "../../model/Result/CommandeForfaitResult";
import {CommandeHoraireResult} from "../../model/Result/CommandeHoraireResult";

@IonicPage()
@Component({
  selector: 'page-commandes',
  templateUrl: 'commandes.html',
})
export class CommandesPage {
  public commandes: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public commandeForfaitPvd : CommandeForfaitProvider, 
    public commandeHorairePvd : CommandeHoraireProvider) {
       this.getMyCommandes(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandesPage');
  }

  getMyCommandes() {
    /* TODO  Filtrer sur les commandes de l'utilisateur connecté soit en tant que client ou en tant que prestataire getAll(idClient) **/
    this.commandeHorairePvd.getAll().subscribe(result =>{
      this.commandes = result.data;
      console.dir(this.commandes);
    })    
  }

}
