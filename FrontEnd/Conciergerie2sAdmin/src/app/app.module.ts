import { AddServicePage } from './../pages/add-service/add-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClientModule} from "@angular/common/http";
import { LoginProvider } from '../providers/login/login';
import { LoginPage } from '../pages/login/login';
import { ServicePage } from '../pages/service/service';
import { ServiceProvider } from '../providers/service/service';
import { PrestationProvider } from '../providers/prestation/prestation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ServicePage,
    AddServicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ServicePage,
    AddServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    ServiceProvider,
    PrestationProvider
  ]
})
export class AppModule {}
