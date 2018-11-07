import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PrestationModel} from "../../model/Models/PrestationModel";
import {PrestataireModel} from "../../model/Models/PrestataireModel";
import {PrestationProvider} from "../../providers/prestation/prestation";
import {PrestataireProvider} from "../../providers/prestataire/prestataire";

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

  private prestations: PrestationModel[];
  private prestataires : PrestataireModel[];
  public prestationWithPrestataire : PrestationModel;
  public selectedPrestataire : number;
  public selectedPrestation : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prestationPvd : PrestationProvider
              , public  prestatairePvd : PrestataireProvider) {
    this.getPrestataires();
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

  public getPrestataires(){
    this.prestatairePvd.getAllPrestataire().subscribe((results) =>{
      this.prestataires = results.data;
    })
  }

  public getPrestationsWithPrestataires(){
    this.prestationPvd.getWithPrestataire().subscribe((result) =>{
      this.prestationWithPrestataire = result.data;
    })
  }

  public linkPrestationToPRestataire(){
    this.prestationPvd.linkPrestationToPrestataire(this.selectedPrestation, this.selectedPrestataire).subscribe((result) =>{

    })
  }

}
