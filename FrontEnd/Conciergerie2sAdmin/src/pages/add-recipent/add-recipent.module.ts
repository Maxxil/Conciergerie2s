import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRecipentPage } from './add-recipent';

@NgModule({
  declarations: [
    AddRecipentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRecipentPage),
  ],
})
export class AddRecipentPageModule {}
