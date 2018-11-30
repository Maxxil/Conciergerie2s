import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeProvider} from "../../providers/commande/commande";
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {DevisModel} from "../../model/Model/DevisModel";
import {CommandeHoraireDetailPage} from "../commande-horaire-detail/commande-horaire-detail";
import {CommandeForfaitDetailPage} from "../commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../devis-detail/devis-detail";

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
      console.log(localStorage.getItem("MesCommandes"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandesPage');
    this.getMyCommandes();
  } 

  getMyCommandes() {
    /* TODO  Filtrer sur les commandes de l'utilisateur connecté soit en tant que client ou en tant que prestataire getAll(idClient) **/
    this.commandePvd.getCommandesClient().subscribe(result =>{
      console.log(result);
      if(result.success){
        this.commandeHoraire = result.data.commandeHoraire;
        this.commandeForfait = result.data.commandeForfait;
        this.commandeDevis = result.data.devis;
      }
    })
}

  detailCommandeHoraire(commande){
    this.navCtrl.push(CommandeHoraireDetailPage, {Commande : commande});
  }

  detailCommandeForfait(commande){
    this.navCtrl.push(CommandeForfaitDetailPage, {Commande: commande});
  }

  detailDevis(commande){
    this.navCtrl.push(DevisDetailPage, {Commande :commande});
  }
}
