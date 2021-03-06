import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {CommandeForfaitProvider} from "../../providers/commande-forfait/commande-forfait";
import {CommandeForfaitModel} from "../../model/Models/CommandeForfaitModel";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";
import {CommandeForfaitDetailPage} from "../commande-forfait-detail/commande-forfait-detail";
import { PRESTATION_IMAGE_URL } from './../../model/Url';
/**
 * Generated class for the CommandeForfaitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-forfait',
  templateUrl: 'commande-forfait.html',
})
export class CommandeForfaitPage {

  public commandes : CommandeForfaitModel[];
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              ,public events: Events
              , public commandePvd : CommandeForfaitProvider) {
    this.getAll();
    events.subscribe('notification:updated', () => {   
      console.log('Event notification:updated');  
      this.getAll();    
    });
  } 

  public getAll(){
    this.commandePvd.getAll().subscribe(result =>{
      console.log(result);
      if(result.success){
        this.commandes = result.data;
      }
    })
  }

  isEnCours(commande){
    return commande.status == CommandeStatus.EN_COURS_ANALYSE;
  }

  public afficherDetailCommande(commande: CommandeForfaitModel){
    this.navCtrl.push(CommandeForfaitDetailPage, {Commande : commande})
  }

}
