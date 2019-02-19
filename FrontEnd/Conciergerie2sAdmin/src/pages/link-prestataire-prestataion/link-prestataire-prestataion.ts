import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PrestationModel} from "../../model/Models/PrestationModel";
import {PrestationProvider} from "../../providers/prestation/prestation";
import {PrestataireProvider} from "../../providers/prestataire/prestataire";
import {PrestataireModel} from "../../model/Models/PrestataireModel";
import {Result} from "../../model/Results/Result";

/**
 * Generated class for the LinkPrestatairePrestataionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-link-prestataire-prestataion',
  templateUrl: 'link-prestataire-prestataion.html',
})
export class LinkPrestatairePrestataionPage {

  public prestations: PrestationModel[];
  public prestataires : PrestataireModel[];
  public prestationWithPrestataire : PrestationModel[];
  public selectedPrestataire : number;
  public selectedPrestation : number;

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public prestationPvd : PrestationProvider
              , public  prestatairePvd : PrestataireProvider
              , public alertCtrl : AlertController) {
    this.getPrestatairesValides();
    this.getPrestations();
    this.getPrestationsWithPrestataires();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LinkPrestatairePrestataionPage');
  }

  public  getPrestations(){
    this.prestationPvd.getAll().subscribe((results) =>{
      this.prestations = results.data;
    })
  }

  public getPrestatairesValides(){
    this.prestatairePvd.getAllPrestataire().subscribe((results) =>{
      this.prestataires = results.data.filter(element => element.utilisateur != null);
    })
  }

  public getPrestationsWithPrestataires(){
    this.prestationPvd.getOnlyWithPrestataire().subscribe((result) =>{
      this.prestationWithPrestataire = result.data;
      console.log(this.prestationWithPrestataire);
    })
  }

  public linkPrestationToPRestataire(){

    let hasPrestataire = false;
    if(this.selectedPrestation != null && this.selectedPrestataire != null){


      let prestations = this.prestationWithPrestataire.filter(elt =>
           elt._id == this.selectedPrestation.toString()
      );
      if(prestations && prestations.length > 0) {

        let prestation = prestations[0];
        hasPrestataire =  prestation.prestataire.some(elt => elt._id == this.selectedPrestataire.toString());

      }

      if(!hasPrestataire) {
        this.prestationPvd.linkPrestationToPrestataire(this.selectedPrestation, this.selectedPrestataire).subscribe((result) =>{
          this.manageDisplaySuccessOrError(result);
          if(result.success){
            this.getPrestationsWithPrestataires();
          }
        })
      }
      else  {
        this.alertCtrl.create({
          title : 'Important',
          message : "Ce prestataire est déjà lié à cette prestation !",
          buttons : [{
            text : 'OK'
          }]
        }).present();

      }
    }
    else{
      this.alertCtrl.create({
        title : 'Important',
        message : "Vous devez selectionner une prestation et un prestataire",
        buttons : [{
          text : 'OK'
        }]
      }).present();
    }
  }

  public deleteLinkPrestationToPrestataire(){
    this.alertCtrl.create({
      title : 'Nticstudio',
      message : "Fonctionnalité non dipo",
      buttons : [{
        text : 'OK'
      }]
    }).present();
  }

  manageDisplaySuccessOrError(result: Result) {
    var alert = this.alertCtrl.create();

    if (result.success) {
      alert.setTitle('Succes');
      alert.setSubTitle('Le prestataire et la prestation on été liés correctement.');
      alert.addButton({
        text: 'OK'
      })
    }
    else {
      alert.setTitle('Erreur');
      alert.setSubTitle("Le prestataire et la prestation n'ont pas été liés correctement.");
      alert.addButton({
        text: 'OK'
      })
    }
  }

}
