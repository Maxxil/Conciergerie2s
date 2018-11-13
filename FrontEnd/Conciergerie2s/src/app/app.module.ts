import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {ServicesPage} from "../pages/services/services";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import { ServiceProvider } from '../providers/service/service';
import {HttpClientModule} from "@angular/common/http";
import { UtilisateurProvider } from '../providers/utilisateur/utilisateur';
import {SigninPage} from "../pages/signin/signin";
import {NotificationsPage} from "../pages/notifications/notifications";
import {ProfilePage} from "../pages/profile/profile";
import {ChatPage} from "../pages/chat/chat";
import {PrestationsPage} from "../pages/prestations/prestations";
import { PrestationProvider } from '../providers/prestation/prestation';
import {LoginProvider} from "../providers/login/login";
import {CommandePage} from "../pages/commande/commande";
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    ServicesPage,
    PrestationsPage,
    TabsPage,
    SigninPage,
    NotificationsPage,
    ProfilePage,
    ChatPage,
    CommandePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    ServicesPage,
    PrestationsPage,
    TabsPage,
    SigninPage,
    NotificationsPage,
    ProfilePage,
    ChatPage,
    CommandePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    UtilisateurProvider,
    PrestationProvider,
    LoginProvider
  ]
})
export class AppModule {}
