import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeHoraireProvider} from "../../providers/commande-horaire/commande-horaire";
import {CommandeForfaitProvider} from "../../providers/commande-forfait/commande-forfait";
import { DevisProvider } from "../../providers/devis/devis";

@IonicPage()
@Component({
  selector: 'page-commandes',
  templateUrl: 'commandes.html',
})
export class CommandesPage {
  public commandeHoraire: any[];
  public commandeForfait: any[];
  public commandeDevis: any[];
  defautseg: string = "horaire";
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public commandeForfaitPvd : CommandeForfaitProvider, 
    public commandeHorairePvd : CommandeHoraireProvider,
    public commandeDevisPvd: DevisProvider) {
      this.getMyCommandes();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandesPage');
    this.getMyCommandes(); 
  }

  getMyCommandes() {    
    /* TODO  Filtrer sur les commandes de l'utilisateur connecté soit en tant que client ou en tant que prestataire getAll(idClient) **/
    this.commandeHorairePvd.getAll().subscribe(result =>{
      this.commandeHoraire = result.data;    
    });
    
    this.commandeForfaitPvd.getAll().subscribe(result =>{
      this.commandeForfait = result.data;      
    });

    this.commandeDevisPvd.getAll().subscribe(result =>{
      this.commandeDevis = result.data;      
    });
    
  }

}
