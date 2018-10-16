import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipientPage } from './recipient';

@NgModule({
  declarations: [
    RecipientPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipientPage),
  ],
})
export class RecipientPageModule {}
