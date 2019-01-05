import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {PrestationModel} from "../../model/Model/PrestationModel";
import {CommandeForfaitModel} from "../../model/Model/CommandeForfaitModel";
import {CommandeForfaitProvider} from "../../providers/commande-forfait/commande-forfait";
import {CommandeForfaitResult} from "../../model/Result/CommandeForfaitResult";
import {CommandeStatus} from "../../model/CommandeStatusEnum";
import {PaypalProvider} from "../../providers/paypal/paypal";
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the CommandeForfaitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-forfait',
  templateUrl: 'commande-forfait.html',
})
export class CommandeForfaitPage {

  private prestation: PrestationModel;
  public commandeForfait : CommandeForfaitModel;
  public today;
  public loading = this.loader.create({
    spinner: 'hide',
    content: 'Loading Please Wait...'
  });
  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public alertCtrl : AlertController
              , public paypalPvd : PaypalProvider
              , public iab : InAppBrowser
              , public loader : LoadingController
              , public commandeForfaitPvd : CommandeForfaitProvider) {
    this.commandeForfait = new CommandeForfaitModel();
    this.prestation = this.navParams.get("Prestation");
    this.commandeForfait.idPrestation = this.prestation._id;
    this.today= new Date();
  }

  public commander(){

    this.loading.present();
    console.log("Paiement");
    this.commandeForfait.status = CommandeStatus.EN_COURS_ANALYSE;
        this.commandeForfaitPvd.add(this.commandeForfait).subscribe(result =>{          
          this.manageDisplaySuccessOrError(result);
          this.annuler();
          this.loading.dismiss();
        });
    
    /*this.paypalPvd.payer(this.prestation.nom , this.prestation.prix*this.commandeForfait.quantite).subscribe(result =>{
      console.log(result);
      var browser = this.iab.create(result.data);
      this.loading.dismiss();
      browser.on('exit').subscribe(() =>{
        this.commandeForfait.status = CommandeStatus.EN_COURS_ANALYSE;
        this.commandeForfaitPvd.add(this.commandeForfait).subscribe(result =>{          
          this.manageDisplaySuccessOrError(result);
          this.annuler();
        });
      });

    });*/

    

  }

  public annuler(){
    this.navCtrl.pop();
  }


  manageDisplaySuccessOrError(result : CommandeForfaitResult){
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
