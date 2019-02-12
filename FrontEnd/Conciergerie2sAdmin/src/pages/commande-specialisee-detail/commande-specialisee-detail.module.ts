import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandeSpecialiseeDetailPage } from './commande-specialisee-detail';

@NgModule({
  declarations: [
    CommandeSpecialiseeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandeSpecialiseeDetailPage),
  ],
})
export class CommandeSpecialiseeDetailPageModule {}
