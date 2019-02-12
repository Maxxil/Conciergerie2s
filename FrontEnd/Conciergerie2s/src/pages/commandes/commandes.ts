import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {CommandeProvider} from "../../providers/commande/commande";
import {CommandeSpecialiseeModel} from "../../model/Model/CommandeSpecialiseeModel";
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {DevisModel} from "../../model/Model/DevisModel";
import {CommandeSpecialiseeDetailPage} from "../commande-specialisee-detail/commande-specialisee-detail";
import {CommandeForfaitDetailPage} from "../commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../devis-detail/devis-detail";
import {PRESTATION_IMAGE_URL} from "../../model/Url";
@IonicPage()
@Component({
  selector: 'page-commandes',
  templateUrl: 'commandes.html',
})
export class CommandesPage {
  public commandesHoraire: CommandeSpecialiseeModel[];
  public commandesForfait: CommandeForfaitModel[];
  public commandesDevis: DevisModel[];
  public currentUserId;
  defautseg: string = "horaire";
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public commandePvd : CommandeProvider, public events: Events) {
      this.currentUserId = localStorage.getItem("IdUtilisateur");
      this.getMyCommandes();
      events.subscribe('refresh:commande', () => {
        this.getMyCommandes();
      });

      events.subscribe('notification:updated', () => {
        this.getMyCommandes();
      });


  }

  ionViewDidLoad() {
    this.getMyCommandes();
  }

  getMyCommandes() {
    this.commandePvd.getCommandesClient().subscribe(result =>{
      if(result.success){
        this.commandesHoraire = result.data.commandeSpecialisee;
        this.commandesForfait = result.data.commandeForfait;
        this.commandesDevis = result.data.devis;
      }
    });
}

  detailCommandeSpecialisee(commande){
    this.navCtrl.push(CommandeSpecialiseeDetailPage, {Commande : commande});
  }

  detailCommandeForfait(commande){
    this.navCtrl.push(CommandeForfaitDetailPage, {Commande: commande});
  }

  detailDevis(commande){
    this.navCtrl.push(DevisDetailPage, {Commande :commande});
  }
}
