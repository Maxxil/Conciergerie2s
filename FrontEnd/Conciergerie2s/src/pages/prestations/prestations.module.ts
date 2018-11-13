import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrestationsPage } from './prestations';

@NgModule({
  declarations: [
    PrestationsPage,
  ],
  imports: [
    IonicPageModule.forChild(PrestationsPage),
  ],
})
export class PrestationsPageModule {}
