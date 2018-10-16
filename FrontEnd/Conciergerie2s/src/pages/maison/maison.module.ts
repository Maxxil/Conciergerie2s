import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaisonPage } from './maison';

@NgModule({
  declarations: [
    MaisonPage,
  ],
  imports: [
    IonicPageModule.forChild(MaisonPage),
  ],
})
export class MaisonPageModule {}
