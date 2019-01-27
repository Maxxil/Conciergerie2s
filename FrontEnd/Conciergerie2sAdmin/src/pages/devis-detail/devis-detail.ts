import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {DevisModel} from "../../model/Models/DevisModel";
import {DevisProvider} from "../../providers/devis/devis";
import {CommandeStatus} from "../../model/Enums/CommandeStatusEnum";
import {DevisPropositionModel} from "../../model/Models/DevisPropositionModel";
import { PRESTATION_IMAGE_URL } from './../../model/Url';

/**
 * Generated class for the DevisDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devis-detail',
  templateUrl: 'devis-detail.html',
})
export class DevisDetailPage {

  public commande : DevisModel;
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  public prestataireChoisi: DevisPropositionModel = null;
  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public commandePvd : DevisProvider
    , public alertCtrl : AlertController) {
    console.log("Commande horaire détail");
    this.commande = this.navParams.get('Commande');
    console.log(this.commande);

    if(this.commande.prestataireChoisi) {
      this.prestataireChoisi  = this.commande.propositions.filter(x => x.prestataire._id.toString() == this.commande.prestataireChoisi.toString()).pop();
    } 
    console.log(this.commande);
    console.log(this.prestataireChoisi);
  
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandeHoraireDetailPage');
  }

  public validerCommande(){
    
    console.log('Valider Commande : ',this.commande);
    
    this.commandePvd.validateCommande(this.commande).subscribe(result =>{
      if(result.success){
        this.commande.status = CommandeStatus.VALIDEE;
        if(result.success){
       
          this.alertCtrl.create({
            title : 'Message',
            message : "Le prestataire a été choisi",
            buttons : [{
              text : 'OK'
            }]
          }).present();
        }
      }
    });

  }

  
  public validerCommandeC2S(){
    this.commandePvd.validateCommandeC2S(this.commande).subscribe(result =>{
      if(result.success){
        this.commande.status = CommandeStatus.VALIDEE;
        if(result.success){
       
          this.alertCtrl.create({
            title : 'Message',
            message : "Le prestataire a été choisi",
            buttons : [{
              text : 'OK'
            }]
          }).present();
        }
      }
    });

  }

  prestataireChoisiExist() {
    return this.prestataireChoisi != null;
  }

  isEnCours(){
    return this.commande.status == CommandeStatus.EN_COURS_ANALYSE || this.commande.status == CommandeStatus.EN_COURS_VALIDATION;
  }

}
