import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {CommandeHoraireModel} from "../../model/Models/CommandeHoraireModel";
import {CommandeHoraireProvider} from "../../providers/commande-horaire/commande-horaire";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";
import { PRESTATION_IMAGE_URL } from './../../model/Url';
import { PrestataireModel } from '../../model/Models/PrestataireModel';
/**
 * Generated class for the CommandeHoraireDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-horaire-detail',
  templateUrl: 'commande-horaire-detail.html',
})
export class CommandeHoraireDetailPage {

  public commande : CommandeHoraireModel;
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  public prestataireChoisi: PrestataireModel = null;
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public commandePvd : CommandeHoraireProvider
              , public alertCtrl : AlertController) {
    console.log("Commande horaire détail");
    this.commande = this.navParams.get('Commande'); 
    console.log(this.commande);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandeHoraireDetailPage');
  }

  public validerCommande(){ 
    
    this.commandePvd.validateCommande(this.commande).subscribe(result =>{
      if(result.success){
       this.commande.status = CommandeStatus.VALIDEE;
        this.alertCtrl.create({
          title : 'Message',
          message : "Le prestataire a été choisi",
          buttons : [{
            text : 'OK'
          }]
        }).present();
      }
    });

  }

  
  prestataireChoisiExist() {
    return this.commande.prestataireChoisi != null;
  }


  isEnCours(){
    return this.commande.status == CommandeStatus.EN_COURS_ANALYSE || this.commande.status == CommandeStatus.EN_COURS_VALIDATION;
  }

}
