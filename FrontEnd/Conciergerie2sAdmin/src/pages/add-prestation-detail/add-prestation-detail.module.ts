import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPrestationDetailPage } from './add-prestation-detail';

@NgModule({
  declarations: [
    AddPrestationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPrestationDetailPage),
  ],
})
export class AddPrestationDetailPageModule {}
