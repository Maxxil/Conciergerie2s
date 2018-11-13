import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UtilisateurDetailPage } from './utilisateur-detail';

@NgModule({
  declarations: [
    UtilisateurDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UtilisateurDetailPage),
  ],
})
export class UtilisateurDetailPageModule {}
