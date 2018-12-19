import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {DevisModel} from "../../model/Model/DevisModel";
import {DevisProvider} from "../../providers/devis/devis";
import {Result} from "../../model/Result/Result";
import {DevisPropositionModel} from "../../model/Model/DevisPropositionModel";

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
  constructor(public navCtrl: NavController
              , public devisPvd : DevisProvider
              , public navParams: NavParams
              , public viewCtrl : ViewController,
              public alertCtrl : AlertController) {
    this.commande = this.navParams.get('Commande');
    console.log("Devis : ");
    console.log(this.commande);
    switch(this.commande.status) {
      case 1: this.status = "Envoyé"; break;
      case 2: this.status = "Validée"; break;
      case 3: this.status = "Livrée"; break;
      case 4: this.status = "En attente de validation"; break;
    }
    console.log('Peutpostuler',this.peutPostuler());
    this.dejapostuler = this.aDejaPostule();
    this.proposition = new DevisPropositionModel();
    this.proposition.idDevis = this.commande._id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandeForfaitDetailPage');
  }


  peutPostuler() {
    return (this.commande.client._id !== localStorage.getItem('IdUtilisateur'));
  }


  postuler(){
    this.devisPvd.souscrirePrestataire(this.commande, this.proposition).subscribe(result =>{
      this.manageDisplaySuccessOrError(result);
    });
  }


  aDejaPostule(){
    var prestataires = this.commande.prestataires;
    prestataires.forEach(element => {
      if(element.utilisateur._id == localStorage.getItem('IdUtilisateur')){
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
