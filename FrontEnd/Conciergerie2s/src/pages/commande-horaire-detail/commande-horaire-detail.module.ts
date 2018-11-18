import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandeHoraireDetailPage } from './commande-horaire-detail';

@NgModule({
  declarations: [
    CommandeHoraireDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandeHoraireDetailPage),
  ],
})
export class CommandeHoraireDetailPageModule {}
