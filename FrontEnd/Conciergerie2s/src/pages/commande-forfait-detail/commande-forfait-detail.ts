import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController, Events} from 'ionic-angular';
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {CommandeForfaitProvider} from "../../providers/commande-forfait/commande-forfait";
import {Result} from "../../model/Result/Result";

/**
 * Generated class for the CommandeForfaitDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-forfait-detail',
  templateUrl: 'commande-forfait-detail.html',
})
export class CommandeForfaitDetailPage {

  public commande : CommandeForfaitModel;
  public status: string = "En cours d'analyse";
  public dejapostuler: boolean = false;
  constructor(public navCtrl: NavController
              , public commandeForfaitPvd : CommandeForfaitProvider
              , public navParams: NavParams
              , public viewCtrl : ViewController,
              public alertCtrl : AlertController,
              public events: Events) {
    this.commande = this.navParams.get('Commande');
    switch(this.commande.status) {
      case 1: this.status = "En cours d'analyse"; break;
      case 2: this.status = "Validée"; break;
      case 3: this.status = "Livrée"; break;
      case 4: this.status = "En attente de validation"; break;
      default: this.status = "??"; break;
    } 
    
    console.log(localStorage.getItem('IdUtilisateur'));
    console.log(this.commande);
    console.log('Peutpostuler',this.peutPostuler());
    this.dejapostuler = this.aDejaPostule();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandeForfaitDetailPage');
  }

  peutPostuler() {
    return (this.commande.client._id !== localStorage.getItem('IdUtilisateur') && this.commande.status == 1);
  }

  postuler(){
    this.commandeForfaitPvd.souscrirePrestataire(this.commande).subscribe(result =>{
      this.events.publish('refresh:commande');
      this.manageDisplaySuccessOrError(result);            
    });
  }

  aDejaPostule(){
    var prestataires = this.commande.prestataires;  
    this.dejapostuler = false;  
    prestataires.forEach(element => {
      if(element.utilisateur.toString() == localStorage.getItem('IdUtilisateur')){      
        this.dejapostuler=true;        
      }
    }); 
    return this.dejapostuler;
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
