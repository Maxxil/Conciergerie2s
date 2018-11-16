import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandeHorairePage } from './commande-horaire';

@NgModule({
  declarations: [
    CommandeHorairePage,
  ],
  imports: [
    IonicPageModule.forChild(CommandeHorairePage),
  ],
})
export class CommandeHorairePageModule {}
