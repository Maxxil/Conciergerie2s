import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {CommandeProvider} from "../../providers/commande/commande";
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {DevisModel} from "../../model/Model/DevisModel";
import {CommandeHoraireDetailPage} from "../commande-horaire-detail/commande-horaire-detail";
import {CommandeForfaitDetailPage} from "../commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../devis-detail/devis-detail";
import {PRESTATION_IMAGE_URL} from "../../model/Url";
@IonicPage()
@Component({
  selector: 'page-commandes',
  templateUrl: 'commandes.html',
})
export class CommandesPage {
  public commandesHoraire: CommandeHoraireModel[];
  public commandesForfait: CommandeForfaitModel[];
  public commandesDevis: DevisModel[];
  public currentUserId;
  defautseg: string = "horaire";
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public commandePvd : CommandeProvider, public events: Events) {
      this.currentUserId = localStorage.getItem("IdUtilisateur");
      this.getMyCommandes();
      console.log(localStorage.getItem("MesCommandes"));
      events.subscribe('refresh:commande', () => {
        this.getMyCommandes();
      });

      events.subscribe('notification:updated', () => {
        this.getMyCommandes();
      });


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
        this.commandesHoraire = result.data.commandeHoraire;
        this.commandesForfait = result.data.commandeForfait;
        this.commandesDevis = result.data.devis;
      }
    });
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
