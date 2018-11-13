import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilisateurModel} from "../../model/Models/UtilisateurModel";
import {UtilisateurProvider} from "../../providers/utilisateur/utilisateur";
import {RoleEnum} from "../../model/Enums/RoleEnum";
import {UtilisateurDetailPage} from "../utilisateur-detail/utilisateur-detail";

/**
 * Generated class for the UtilisateurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-utilisateur',
  templateUrl: 'utilisateur.html',
})
export class UtilisateurPage {

  public prestataires : UtilisateurModel[] = [];
  public clients : UtilisateurModel[] = [];

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public utilisateurPvd : UtilisateurProvider) {
    this.getUtilisateurs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UtilisateurPage');
  }

  public getUtilisateurs(){
    this.utilisateurPvd.getAll().subscribe(result =>{
      result.data.forEach(element =>{
        if(element.role == RoleEnum.CLIENT){
          this.clients.push(element)
        }
        if(element.role == RoleEnum.PRESTATAIRE){
          this.prestataires.push(element);
        }
      });
      console.log(this.prestataires);
      console.log(this.clients);
    });
  }

  public displayUtilisateur(utilisateur){
    this.navCtrl.push(UtilisateurDetailPage , {Utilisateur : utilisateur})
  }

}
