import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PrestationModel} from "../../model/Models/PrestationModel";
import {PrestationProvider} from "../../providers/prestation/prestation";
import {PrestataireProvider} from "../../providers/prestataire/prestataire";
import {UserModel} from "../../model/Models/UserModel";

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
  private prestataires : UserModel[];
  public prestationWithPrestataire : PrestationModel[];
  public selectedPrestataire : number;
  public selectedPrestation : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public prestationPvd : PrestationProvider
              , public  prestatairePvd : PrestataireProvider) {
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
    console.log("getPrestatairesValides");
    this.prestatairePvd.getPrestatairesValides().subscribe((results) =>{
      console.log(this.prestataires);
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
