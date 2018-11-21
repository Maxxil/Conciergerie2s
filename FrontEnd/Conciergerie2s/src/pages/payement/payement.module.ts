import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayementPage } from './payement';

@NgModule({
  declarations: [
    PayementPage,
  ],
  imports: [
    IonicPageModule.forChild(PayementPage),
  ],
})
export class PayementPageModule {}
