import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController
              , public commandeHorairePvd : CommandeHoraireProvider
              , public navParams: NavParams
              , public viewCtrl : ViewController,
              public alertCtrl : AlertController) {
    this.commande = this.navParams.get('Commande');
    console.log(this.commande.prestataires);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandeForfaitDetailPage');
  }

  postuler(){
    if(this.aDejaPostule())
    {
      var alert = this.alertCtrl.create();
      alert.setTitle('Erreur');
      alert.setSubTitle('Vous avez déjà postulé.');
      alert.addButton({
        text : 'OK',
        handler : data => {
          this.annuler();
        }
      });
      alert.present();
    }
    else{
      this.commandeHorairePvd.souscrirePrestataire(this.commande).subscribe(result =>{
        this.manageDisplaySuccessOrError(result);
      });
    }

  }

  annuler(){
    this.viewCtrl.dismiss();
  }

  aDejaPostule(){
    var prestataires = this.commande.prestataires;
    prestataires.forEach(element => {
      if(element.utilisateur._id == localStorage.getItem('IdUtilisateur')){
        return true;
      }

    });
    return false;
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
