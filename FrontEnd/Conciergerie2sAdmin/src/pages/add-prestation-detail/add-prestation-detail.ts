import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-prestation-detail',
  templateUrl: 'add-prestation-detail.html',
})
export class AddPrestationDetailPage {
  public detailContenu: string;
  constructor(
      public viewCtrl: ViewController
      ,public navCtrl: NavController
      , public navParams: NavParams) {   
  }

  add(){
    this.viewCtrl.dismiss(
      {
        contenu: this.detailContenu
      }
    );
  }

  update(){
    this.viewCtrl.dismiss();
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
