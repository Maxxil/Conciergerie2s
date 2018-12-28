import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeHoraireDetailPage} from "../commande-horaire-detail/commande-horaire-detail";
import {CommandeForfaitDetailPage} from "../commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../devis-detail/devis-detail";
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {DevisModel} from "../../model/Model/DevisModel";
import {CommandeProvider} from "../../providers/commande/commande";
import {PRESTATION_IMAGE_URL} from "../../model/Url";
/**
 * Generated class for the CommandesPostulerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commandes-postuler',
  templateUrl: 'commandes-postuler.html',
})
export class CommandesPostulerPage {

  public commandesHoraire: CommandeHoraireModel[];
  public commandesForfait: CommandeForfaitModel[];
  public commandesDevis: DevisModel[];
  defautseg: string = "horaire";
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  public currentUserId;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public commandePvd : CommandeProvider) {
    this.currentUserId = localStorage.getItem("IdUtilisateur");
    this.getMyCommandes();
    console.log(localStorage.getItem("MesCommandes"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandesPage');
    this.getMyCommandes();
  }

  getMyCommandes() {
    console.log('getMyCommandes pour postuler');
    /* TODO  Filtrer sur les commandes de l'utilisateur connecté soit en tant que client ou en tant que prestataire getAll(idClient) **/
    this.commandePvd.getCommandesByIdUtilisateur().subscribe(result =>{
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
