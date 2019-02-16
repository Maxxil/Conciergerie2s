import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController, Events, LoadingController} from 'ionic-angular';
import {DevisModel} from "../../model/Model/DevisModel";
import {DevisProvider} from "../../providers/devis/devis";
import {Result} from "../../model/Result/Result";
import {DevisPropositionModel} from "../../model/Model/DevisPropositionModel";
import { PaypalProvider } from '../../providers/paypal/paypal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CommandeStatus } from '../../model/Enums/CommandeStatusEnum';
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
  public status: string = "En cours d'analyse";
  public dejapostuler: boolean = false;
  public proposition : DevisPropositionModel;
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;
  public loading = this.loader.create({
    spinner: 'hide',
    content: 'Merci de patienter...'
  });
  public prestataireChoisi: DevisPropositionModel = null;
  constructor(public navCtrl: NavController
              , public devisPvd : DevisProvider
              , public navParams: NavParams
              , public viewCtrl : ViewController
              ,public alertCtrl : AlertController
              , public paypalPvd : PaypalProvider
              , public iab : InAppBrowser
              , public loader : LoadingController
              ,public events: Events) {


  this.commande = this.navParams.get('Commande');

  switch(this.commande.status) {
    case 1: this.status = "Envoyé"; break;
    case 2: this.status = "Validée"; break;
    case 3: this.status = "Livrée"; break;
    case 4: this.status = "En attente de validation"; break;
    case 5: this.status = "En attente de paiement"; break;
    case 8: this.status = "Réglement reçu"; break;
  }
 this.proposition = new DevisPropositionModel();
    if(this.commande.prestataireChoisi) {
      this.proposition = this.commande.propositions.filter(x => x.prestataire._id == this.commande.prestataireChoisi._id).pop();     
    }
    else {

      if(this.commande.byC2S==1) {
        this.proposition.prix = this.commande.prixC2S;
        this.proposition.dateProposee =  this.commande.dateC2S;
      }
    }    
    this.dejapostuler = this.aDejaPostule();
  }

  ionViewDidLoad() {
    
  }


  peutPostuler() {
    return (this.commande.client._id !== localStorage.getItem('IdUtilisateur'));
  }

  postuler(){
    this.devisPvd.souscrirePrestataire(this.commande, this.proposition).subscribe(result =>{
      this.events.publish('refresh:commande');
      this.dejapostuler = true;
      this.manageDisplaySuccessOrError(result);
    });
  }


  aDejaPostule(){
    var propositions = this.commande.propositions;
    propositions.forEach(element => {
      if(element.prestataire.utilisateur.toString() == localStorage.getItem('IdUtilisateur')){
        this.dejapostuler=true;
        this.proposition = element;
      }
    });
    return this.dejapostuler;
  }

  apayer() {
    return this.commande.status == 5 && this.commande.client._id == localStorage.getItem('IdUtilisateur');
  }

  propositionChoisi() {   
    var propositions = this.commande.propositions;
    propositions.forEach(element => {
      if(element.prestataire.utilisateur._id == this.prestataireChoisi._id){

        this.proposition = element;
      }
    });
  }

  commander(){
    this.loading.present();  
    this.paypalPvd.payer(this.commande.prestation.nom , this.proposition.prix).subscribe(result => {      
      var browser = this.iab.create(result.data);
      this.loading.dismiss();  
      browser.on('exit').subscribe(() =>{                     
        this.devisPvd.updateStatus(this.commande, CommandeStatus.PAYEE.toString()).subscribe(result => {
          this.commande.status = CommandeStatus.PAYEE;
          this.commande.dateReglement = Date.now();  
          this.alertCtrl.create().setTitle('Succes')
              .setSubTitle('Merci pour votre paiement. Nous vous contacterons pour confirmer le RDV.')
              .addButton({
                text : 'OK',
                handler : data => {
                this.annuler();
              }
          }).present();
        });
      });
    });
  }

  commanderhorsligne(){                 
    this.devisPvd.updateModePaiement(this.commande, CommandeStatus.PAYEE.toString()).subscribe(result => {
      this.alertCtrl.create().setTitle('Succes')
          .setSubTitle('Merci de bien vouloir faire l\'appoint ou le nécessaire pour votre règlement. Nous vous contacterons pour confirmer le RDV.')
          .addButton({
            text : 'OK',
            handler : data => {
            this.annuler();
          }
      }).present();
    });
   }


  annuler(){
    this.viewCtrl.dismiss();
  }

  manageDisplaySuccessOrError(result : Result){
    var alert = this.alertCtrl.create();
    if(result.success){
      alert.setTitle('Succes');
      alert.setSubTitle('Vous avez postulé avec succés.');
      alert.addButton({
        text : 'OK',
        handler : data => {
          this.annuler();
        }
      })
    }
    else{
      alert.setTitle('Erreur');
      alert.setSubTitle("Une erreur s'est produite. Contactez le service technique pour plus d'information.");
      alert.addButton({
        text : 'OK'
      })
    }
    alert.present();
  }

}
