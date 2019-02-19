import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {PrestationModel} from "../../model/Model/PrestationModel";
import {CommandeSpecialiseeModel} from "../../model/Model/CommandeSpecialiseeModel";
import {CommandeSpcialiseeProvider} from "../../providers/commande-specialisee/commande-specialisee";
import {CommandeSpecialiseeResult} from "../../model/Result/CommandeSpecialiseeResult";
import {CommandeStatus} from "../../model/CommandeStatusEnum";
import {PaypalProvider} from "../../providers/paypal/paypal";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {TypePrestationSpecialiseeEnum} from "../../model/Enums/TypePrestationSpecialiseeEnum";

/**
 * Generated class for the CommandeSpecialiseePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-horaire',
  templateUrl: 'commande-specialisee.html',
})
export class CommandeSpecialiseePage {

  private prestation : PrestationModel;
  public commandeSpecialisee : CommandeSpecialiseeModel;
  public typePrestationSpecialisee = TypePrestationSpecialiseeEnum;
  public today;
  public loading = this.loader.create({
    spinner: 'hide',
    content: 'Merci de patienter...'
  });
  constructor(public navCtrl: NavController
              , public commandeSpecialiseePvd : CommandeSpcialiseeProvider
              , public alertCtrl : AlertController
              , public paypalPvd : PaypalProvider
              , public iab : InAppBrowser
              , public loader : LoadingController
              , public navParams: NavParams) {
    this.commandeSpecialisee = new CommandeSpecialiseeModel();
    this.prestation = this.navParams.get("Prestation");
    this.commandeSpecialisee.idPrestation = this.prestation._id;
    this.today= new Date();
  }

  commander(){
    this.loading.present();
    this.paypalPvd.payer(this.prestation.nom , this.prestation.prix*this.commandeSpecialisee.quantite).subscribe(result => {
      var browser = this.iab.create(result.data);
      this.loading.dismiss();
      browser.on('exit').subscribe(() =>{
        this.commandeSpecialiseePvd.add(this.commandeSpecialisee).subscribe(result => {
          this.commandeSpecialisee.status = CommandeStatus.EN_COURS_ANALYSE;
          this.manageDisplaySuccessOrError(result);
          this.annuler();
        });
      });
    });
  }

  annuler(){
    this.navCtrl.pop();
  }

  manageDisplaySuccessOrError(result : CommandeSpecialiseeResult){
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

  
  public getTypeLibellePrix() {
    let type = "";
    switch(Number(this.prestation.typePrestationSpecialisee)) {
      case TypePrestationSpecialiseeEnum.HEURE: type = '/ h';break;
      case TypePrestationSpecialiseeEnum.KILOGRAMME: type = '/ kg';break;
      case TypePrestationSpecialiseeEnum.LITRE: type = '/ litre';break;
      case TypePrestationSpecialiseeEnum.SURFACE: type = '/ m²';break;
    }

    return type;
  }

  public getTypeLibelleInput() {
    let type = "";
    switch(Number(this.prestation.typePrestationSpecialisee)) {
      case TypePrestationSpecialiseeEnum.HEURE: type = "Quantité en Heures";break;
      case TypePrestationSpecialiseeEnum.KILOGRAMME: type = 'Quantité en Kilos';break;
      case TypePrestationSpecialiseeEnum.LITRE: type = 'Quantité en Litres';break;
      case TypePrestationSpecialiseeEnum.SURFACE: type = 'Superficie';break;
    }

    return type;
  }

}
