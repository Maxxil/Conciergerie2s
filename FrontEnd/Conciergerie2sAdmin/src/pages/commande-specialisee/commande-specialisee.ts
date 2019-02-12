import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {CommandeSpecialiseeModel} from "../../model/Models/CommandeSpecialiseeModel";
import {CommandeSpecialiseeProvider} from "../../providers/commande-specialisee/commande-specialisee";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";
import {CommandeSpecialiseeDetailPage} from "../commande-specialisee-detail/commande-specialisee-detail";
import { PRESTATION_IMAGE_URL } from './../../model/Url';
/**
/**
 * Generated class for the CommandeSpecialiseePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-specialisee',
  templateUrl: 'commande-specialisee.html',
})
export class CommandeSpecialiseePage {

  public commandes : CommandeSpecialiseeModel[];
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    ,public events: Events
    , public commandePvd : CommandeSpecialiseeProvider) {


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

  public afficherDetailCommande(commande: CommandeSpecialiseeModel){
    this.navCtrl.push(CommandeSpecialiseeDetailPage, {Commande : commande})
  }
}
