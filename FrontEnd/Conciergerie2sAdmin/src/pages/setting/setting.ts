import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { PaypalModel } from '../../model/Models/PaypalModel';
import { PaypalProvider } from '../../providers/paypal/paypal';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  paypal: any;


  constructor(public navCtrl: NavController, public navParams: NavParams ,public paypalProvider : PaypalProvider
    , public alertCtrl : AlertController
    , public viewCtrl : ViewController) {
    this.paypal = new PaypalModel();
    this.getPaypalInformation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  
  getPaypalInformation(){
    this.paypalProvider.get().subscribe(result =>{
      console.log(result);
      if(result.data.length > 0){
        this.paypal = result.data[0];
      }
    })
  }

  
  update(){   
    this.updatePaypalInformation();
  }

  updatePaypalInformation(){
    this.paypalProvider.update(this.paypal).subscribe(result =>{
      this.manageSuccessOrError(result);
    })
  }

  
  manageSuccessOrError(result){
    var alert = null;
    if(result.success){
      alert = this.alertCtrl.create({
        title : 'Succés',
        message : 'La mise à jour a été faite correctement',
        buttons : [{
          text : 'OK'
        }]
      });
      alert.present();
    }
    else{
      alert = this.alertCtrl.create({
        title : 'Echec',
        message : 'La mise à jour n"a été faite correctement',
        buttons : [{
          text : 'OK'
        }]
      });
      alert.present();
    }
  }

}
