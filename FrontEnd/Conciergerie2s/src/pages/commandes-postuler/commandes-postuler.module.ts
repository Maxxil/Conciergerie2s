import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommandesPostulerPage } from './commandes-postuler';

@NgModule({
  declarations: [
    CommandesPostulerPage,
  ],
  imports: [
    IonicPageModule.forChild(CommandesPostulerPage),
  ],
})
export class CommandesPostulerPageModule {}
