import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DevisDetailPage } from './devis-detail';

@NgModule({
  declarations: [
    DevisDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DevisDetailPage),
  ],
})
export class DevisDetailPageModule {}
