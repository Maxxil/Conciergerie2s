import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeHoraireModel} from "../../model/Models/CommandeHoraireModel";
import {CommandeHoraireProvider} from "../../providers/commande-horaire/commande-horaire";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";
import {CommandeHoraireDetailPage} from "../commande-horaire-detail/commande-horaire-detail";
import { PRESTATION_IMAGE_URL } from './../../model/Url';
/**
/**
 * Generated class for the CommandeHorairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-horaire',
  templateUrl: 'commande-horaire.html',
})
export class CommandeHorairePage {

  public commandes : CommandeHoraireModel[];
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public commandePvd : CommandeHoraireProvider) {
    this.getAll();
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
    return commande.status == CommandeStatus.EN_COURS_ANALYSE || commande.status == CommandeStatus.EN_COURS_VALIDATION;
  }

  public afficherDetailCommande(commande: CommandeHoraireModel){
    this.navCtrl.push(CommandeHoraireDetailPage, {Commande : commande})
  }
}
