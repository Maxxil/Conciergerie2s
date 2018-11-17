import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeProvider} from "../../providers/commande/commande";
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {DevisModel} from "../../model/Model/DevisModel";

@IonicPage()
@Component({
  selector: 'page-commandes',
  templateUrl: 'commandes.html',
})
export class CommandesPage {
  public commandeHoraire: CommandeHoraireModel[];
  public commandeForfait: CommandeForfaitModel[];
  public commandeDevis: DevisModel[];
  defautseg: string = "horaire";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public commandePvd : CommandeProvider) {
      this.getMyCommandes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandesPage');
    this.getMyCommandes();
  }

  getMyCommandes() {
    /* TODO  Filtrer sur les commandes de l'utilisateur connecté soit en tant que client ou en tant que prestataire getAll(idClient) **/
    this.commandePvd.getCommandesByIdUtilisateur().subscribe(result =>{
      if(result.success){
        this.commandeHoraire = result.data.commandeHoraire;
        this.commandeForfait = result.data.commandeForfait;
        this.commandeDevis = result.data.devis;
      }
    })

  }

}
