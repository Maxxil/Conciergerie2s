import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandeForfaitDetailPage } from './commande-forfait-detail';

@NgModule({
  declarations: [
    CommandeForfaitDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandeForfaitDetailPage),
  ],
})
export class CommandeForfaitDetailPageModule {}
