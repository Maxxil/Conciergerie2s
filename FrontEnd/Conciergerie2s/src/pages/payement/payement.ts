import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PayementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payement',
  templateUrl: 'payement.html',
})
export class PayementPage {

  public prix : number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.prix = this.navParams.get('Prix');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayementPage');
  }

}
