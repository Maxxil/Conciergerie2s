import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommandeForfaitProvider} from "../../providers/commande-forfait/commande-forfait";
import {CommandeForfaitModel} from "../../model/Models/CommandeForfaitModel";

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

  public commande : CommandeForfaitModel[];

  constructor(public navCtrl: NavController
              , public navParams: NavParams
              , public commandePvd : CommandeForfaitProvider) {
    this.getAll();
  }

  public getAll(){
    this.commandePvd.getAll().subscribe(result =>{
      console.log(result);
      if(result.success){

        this.commande = result.data;
      }
    })
  }

}
