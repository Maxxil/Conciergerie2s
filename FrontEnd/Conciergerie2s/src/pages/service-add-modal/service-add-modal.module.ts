import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceAddModalPage } from './service-add-modal';

@NgModule({
  declarations: [
    ServiceAddModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceAddModalPage),
  ],
})
export class ServiceAddModalPageModule {}
