import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MesCommandesPostuleesPage } from './mes-commandes-postulees';

@NgModule({
  declarations: [
    MesCommandesPostuleesPage,
  ],
  imports: [
    IonicPageModule.forChild(MesCommandesPostuleesPage),
  ],
})
export class MesCommandesPostuleesPageModule {}
