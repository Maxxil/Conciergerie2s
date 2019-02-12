import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {CommandeSpecialiseeDetailPage} from "../commande-specialisee-detail/commande-specialisee-detail";
import {CommandeForfaitDetailPage} from "../commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../devis-detail/devis-detail";
import {CommandeSpecialiseeModel} from "../../model/Model/CommandeSpecialiseeModel";
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

  public commandesHoraire: CommandeSpecialiseeModel[];
  public commandesForfait: CommandeForfaitModel[];
  public commandesDevis: DevisModel[];
  defautseg: string = "horaire";
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  public currentUserId;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public commandePvd : CommandeProvider, public events: Events) {
    this.currentUserId = localStorage.getItem("IdUtilisateur");
    this.getMyCommandes();
    events.subscribe('refresh:commande', () => {
      this.getMyCommandes();
    });
  }

  ionViewDidLoad() {
    this.getMyCommandes();
  }

  getMyCommandes() {
    this.commandePvd.getCommandesByIdUtilisateur().subscribe(result =>{
      if(result.success){
        this.commandesHoraire = result.data.commandeSpecialisee.filter(
          x => !x.prestataires.some(
            p => p.utilisateur == this.currentUserId
          )
        );
        this.commandesForfait = result.data.commandeForfait.filter(
          x => !x.prestataires.some(
            p => p.utilisateur == this.currentUserId
          )
        );
        this.commandesDevis = result.data.devis.filter(
          x => !x.propositions.some(
            p => p.prestataire.utilisateur.toString() == this.currentUserId
            )
        );
      }
    });

  }

  aDejaPostule(commande){
    var prestataires = commande.prestataires;
    let result = false;
    if(prestataires.length > 0) {
      prestataires.forEach(element => {
        if(element.utilisateur == localStorage.getItem('IdUtilisateur')){
          result=true;
        }
      });
    }
    return  result;
  }


  aDejaPostuleDevis(commande){
    var propositions = commande.propositions;
    let result = false;
    propositions.forEach(element => {
      if(element.prestataire.utilisateur.toString() == localStorage.getItem('IdUtilisateur')){
       result=true;
      }
    });

    return  result;
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
