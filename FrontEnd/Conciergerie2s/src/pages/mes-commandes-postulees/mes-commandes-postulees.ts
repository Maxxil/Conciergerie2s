import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {CommandeHoraireDetailPage} from "../commande-horaire-detail/commande-horaire-detail";
import {CommandeForfaitDetailPage} from "../commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../devis-detail/devis-detail";
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {DevisModel} from "../../model/Model/DevisModel";
import {CommandeProvider} from "../../providers/commande/commande";
import {PRESTATION_IMAGE_URL} from "../../model/Url";

/**
 * Generated class for the MesCommandesPostuleesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mes-commandes-postulees',
  templateUrl: 'mes-commandes-postulees.html',
})
export class MesCommandesPostuleesPage {

  
  public commandesHoraire: CommandeHoraireModel[];
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
    console.log('ionViewDidLoad CommandesPage');
    this.getMyCommandes();
  }

  getMyCommandes() {
    console.log('getMyCommandes pour postuler');
    
    /* TODO  Filtrer sur les commandes de l'utilisateur connecté soit en tant que client ou en tant que prestataire getAll(idClient) **/
    this.commandePvd.getCommandesByIdUtilisateur().subscribe(result =>{
      console.log(result);
      if(result.success){
        
        this.commandesHoraire = result.data.commandeHoraire.filter(
          x => x.prestataires.some( 
            p => p.utilisateur == this.currentUserId
          )
        );
        
        this.commandesForfait = result.data.commandeForfait.filter(
          x => x.prestataires.some( 
            p => p.utilisateur == this.currentUserId
          )
        );
        
        this.commandesDevis = result.data.devis.filter(
          x => x.propositions.some(
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
        if(element.utilisateur == this.currentUserId){      
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
      if(element.prestataire.utilisateur.toString() == this.currentUserId){
       result=true;
      }
    });
   
    return  result;
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
