import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PrestationModel} from "../../../../Conciergerie2sAdmin/src/model/Models/PrestationModel";
import {CommandeHoraireModel} from "../../model/Model/CommandeHoraireModel";
import {CommandeHoraireProvider} from "../../providers/commande-horaire/commande-horaire";
import {CommandeHoraireResult} from "../../model/Result/CommandeHoraireResult";

/**
 * Generated class for the CommandeHorairePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-commande-horaire',
  templateUrl: 'commande-horaire.html',
})
export class CommandeHorairePage {

  private prestation : PrestationModel;
  public commandeHoraire : CommandeHoraireModel;

  constructor(public navCtrl: NavController
              , public commandeHorairePvd : CommandeHoraireProvider
              , public alertCtrl : AlertController
              , public navParams: NavParams) {
    this.commandeHoraire = new CommandeHoraireModel();
    this.prestation = this.navParams.get("Prestation");
    this.commandeHoraire.idPrestation = this.prestation._id;
  }

  commander(){
    this.commandeHorairePvd.add(this.commandeHoraire).subscribe(result =>{
      this.manageDisplaySuccessOrError(result);
    });
  }

  annuler(){
    this.navCtrl.pop();
  } 

  manageDisplaySuccessOrError(result : CommandeHoraireResult){
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
