import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController
              , public commandeForfaitPvd : CommandeForfaitProvider
              , public navParams: NavParams
              , public viewCtrl : ViewController,
              public alertCtrl : AlertController) {
    this.commande = this.navParams.get('Commande');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandeForfaitDetailPage');
  }

  postuler(){
    this.commandeForfaitPvd.souscrirePrestataire(this.commande).subscribe(result =>{
      this.manageDisplaySuccessOrError(result);
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
