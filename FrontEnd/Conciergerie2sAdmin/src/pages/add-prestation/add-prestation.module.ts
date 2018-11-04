import { NgModule } from '@angular/core';
import { IonicPageModule, ModalController } from 'ionic-angular';
import { AddPrestationPage } from './add-prestation';

@NgModule({
  declarations: [
    AddPrestationPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPrestationPage),
  ],
})
export class AddPrestationPageModule {
  constructor(public modalCtrl: ModalController) {}
}
