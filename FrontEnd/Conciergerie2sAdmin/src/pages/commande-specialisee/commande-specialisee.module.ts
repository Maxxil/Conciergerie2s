import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandeSpecialiseePage } from './commande-specialisee';

@NgModule({
  declarations: [
    CommandeSpecialiseePage,
  ],
  imports: [
    IonicPageModule.forChild(CommandeSpecialiseePage),
  ],
})
export class CommandeSpecialiseePageModule {}
