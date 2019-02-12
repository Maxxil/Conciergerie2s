import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServiceModel} from "../../model/Model/ServiceModel";
import {ServiceProvider} from "../../providers/service/service";
import {PrestationModel} from "../../model/Model/PrestationModel";
import {DevisPage} from "../devis/devis";
import {CommandeForfaitPage} from "../commande-forfait/commande-forfait";
import {CommandeSpecialiseePage} from "../commande-specialisee/commande-specialisee";
import {TypePrixEnum} from "../../model/Enums/TypePrixEnum";
import {PRESTATION_IMAGE_URL} from "../../model/Url";

/**
 * Generated class for the PrestationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prestations',
  templateUrl: 'prestations.html',
})
export class PrestationsPage {

  public service : ServiceModel;
  public prestationImageUrl : string = PRESTATION_IMAGE_URL;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public servicePvd: ServiceProvider) {
    this.service = this.navParams.get('Service');
    this.getServiceWithPrestations();
  }

  public getServiceWithPrestations(){
    this.servicePvd.getByIdWithPrestation(this.service._id).subscribe(result =>{
      this.service = result.data[0];
    })
  }

  public commander(prestation : PrestationModel){
    if(prestation.typeprix == TypePrixEnum.DEVIS)
    {
      this.navCtrl.push(DevisPage, {Prestation : prestation});
    }
    if(prestation.typeprix == TypePrixEnum.FORFAIT){
      this.navCtrl.push(CommandeForfaitPage, {Prestation : prestation});
    }
    if(prestation.typeprix == TypePrixEnum.SPECIALISE)
    {
      this.navCtrl.push(CommandeSpecialiseePage, {Prestation : prestation});
    }
  }

}
