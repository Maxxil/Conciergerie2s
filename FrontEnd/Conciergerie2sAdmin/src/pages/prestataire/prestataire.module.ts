import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrestatairePage } from './prestataire';

@NgModule({
  declarations: [
    PrestatairePage,
  ],
  imports: [
    IonicPageModule.forChild(PrestatairePage),
  ],
})
export class PrestatairePageModule {}
