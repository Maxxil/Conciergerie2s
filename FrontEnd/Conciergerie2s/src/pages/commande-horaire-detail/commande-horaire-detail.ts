import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController, Events} from 'ionic-angular';
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {CommandeHoraireProvider} from "../../providers/commande-horaire/commande-horaire";
import {Result} from "../../model/Result/Result";

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
  public status: string = "En cours d'analyse";
  public dejapostuler: boolean = false;
  constructor(public navCtrl: NavController
              , public commandeHorairePvd : CommandeHoraireProvider
              , public navParams: NavParams
              , public viewCtrl : ViewController,
              public alertCtrl : AlertController,
              public events: Events) {
    this.commande = this.navParams.get('Commande');
    switch(this.commande.status) {
      case 1: this.status = "Envoyé"; break;
      case 2: this.status = "Validée"; break;
      case 3: this.status = "Livrée"; break;
      case 4: this.status = "En attente de validation"; break;
      case 8: this.status = "Payée"; break;
    } 
    this.dejapostuler = this.aDejaPostule();
  
  }

  ionViewDidLoad() {    
  }
  peutPostuler() {
    return (this.commande.client._id !== localStorage.getItem('IdUtilisateur'));
  } 

  postuler(){    
    if(this.aDejaPostule())
    {
      var alert = this.alertCtrl.create();
      alert.setTitle('Erreur');
      alert.setSubTitle('Vous avez déjà postulé.');
      alert.addButton({
        text : 'OK',
        handler : () => {
          this.annuler();
        }
      });
      alert.present();
    }
    else{
      this.commandeHorairePvd.souscrirePrestataire(this.commande).subscribe(result =>{    
        this.events.publish('refresh:commande'); 
        this.dejapostuler = true;  
        this.manageDisplaySuccessOrError(result);
      });
    }

  }

  annuler(){
    this.viewCtrl.dismiss();
  }

   aDejaPostule(){
    var prestataires = this.commande.prestataires;  
    this.dejapostuler=false; 
    prestataires.forEach(element => {
      if(element.utilisateur.toString() == localStorage.getItem('IdUtilisateur')){      
        this.dejapostuler=true;        
      }
    });
    return this.dejapostuler;
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
