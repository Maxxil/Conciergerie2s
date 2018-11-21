import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {PrestationModel} from "../../model/Model/PrestationModel";
import {DevisModel} from "../../model/Model/DevisModel";
import {DevisProvider} from "../../providers/devis/devis";
import {DevisResult} from "../../model/Result/DevisResult";
import {CommandeStatus} from "../../model/CommandeStatusEnum";
import {PaypalProvider} from "../../providers/paypal/paypal";
import {InAppBrowser} from "@ionic-native/in-app-browser";

/**
 * Generated class for the DevisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-devis',
  templateUrl: 'devis.html',
})
export class DevisPage {

  private prestation : PrestationModel;
  public devis : DevisModel;
  public loading = this.loader.create({
    spinner: 'hide',
    content: 'Loading Please Wait...'
  });
  constructor(public navCtrl: NavController
              , public devisPvd : DevisProvider
              , public paypalPvd : PaypalProvider
              , public alertCtrl : AlertController
              , public iab : InAppBrowser
              , public loader : LoadingController
              , public navParams: NavParams) {
    this.devis = new DevisModel();
    this.prestation = this.navParams.get("Prestation");
    this.devis.idPrestation = this.prestation._id;
  }

  commander(){
    this.loading.present();
    this.paypalPvd.payer(this.prestation.nom , 1).subscribe(result => {
      this.iab.create(result.data);
      this.loading.dismiss();
      this.devis.status = CommandeStatus.EN_COURS_ANALYSE;
      this.devisPvd.add(this.devis).subscribe(result => {
        this.manageDisplaySuccessOrError(result);
      })
    });
  }

  annuler(){
    this.navCtrl.pop();
  }

  manageDisplaySuccessOrError(result : DevisResult){
    var alert = this.alertCtrl.create();

    if(result.success){
      alert.setTitle('Succes');
      alert.setSubTitle('La commande a été ajouté correctement.');
      alert.addButton({
        text : 'OK',
        handler : data => {
          this.annuler();
        }
      })
    }
    else{
      alert.setTitle('Erreur');
      alert.setSubTitle("La commande n'a pas pu être inséré correctement. Contactez le service technique pour plus d'information.");
      alert.addButton({
        text : 'OK'
      })
    }
    alert.present();
  }

}
