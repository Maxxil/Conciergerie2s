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
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ServiceProvider } from '../providers/service/service';
import { PrestationProvider } from '../providers/prestation/prestation';
import { MenuPage } from '../pages/menu/menu';
import { AddPrestationPage } from '../pages/add-prestation/add-prestation';
import {PrestationPage} from "../pages/prestation/prestation";
import {LinkServicePrestationPage} from "../pages/link-service-prestation/link-service-prestation";
import { PrestataireProvider } from '../providers/prestataire/prestataire';
import { AddPrestationDetailPage } from '../pages/add-prestation-detail/add-prestation-detail';
import {ValiderPrestatairePage} from "../pages/valider-prestataire/valider-prestataire";
import {LinkPrestatairePrestataionPage} from "../pages/link-prestataire-prestataion/link-prestataire-prestataion";
import {PrestatairePage} from "../pages/prestataire/prestataire";
import {NotificationsPage} from "../pages/notifications/notifications";
import {SettingPage} from "../pages/setting/setting";

import {ChatPage} from '../pages/chat/chat';
import { ChatService } from "../providers/chat/chat-service";

import { UtilisateurProvider } from '../providers/utilisateur/utilisateur';
import {UtilisateurPage} from "../pages/utilisateur/utilisateur";
import {UtilisateurDetailPage} from "../pages/utilisateur-detail/utilisateur-detail";
import { CommandeHoraireProvider } from '../providers/commande-horaire/commande-horaire';
import { CommandeForfaitProvider } from '../providers/commande-forfait/commande-forfait';
import { DevisProvider } from '../providers/devis/devis';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommandePage} from '../pages/commande/commande';
import {DevisPage} from '../pages/devis/devis';
import {CommandeHorairePage} from "../pages/commande-horaire/commande-horaire";
import {CommandeForfaitPage} from "../pages/commande-forfait/commande-forfait";
import { CommandeProvider } from '../providers/commande/commande';
import { PaypalProvider } from '../providers/paypal/paypal';
import {ProfilePage} from "../pages/profile/profile";
import {CommandeHoraireDetailPage} from "../pages/commande-horaire-detail/commande-horaire-detail";
import {CommandeForfaitDetailPage} from "../pages/commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../pages/devis-detail/devis-detail";
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { OneSignal } from '@ionic-native/onesignal';

import { CHAT_URL } from '../model/Url';
import { NotificationProvider } from '../providers/notification/notification';
const configChat: SocketIoConfig = { url: CHAT_URL, options: {}} ;

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    ServicePage,
    AddServicePage,
    AddPrestationPage,
    PrestationPage,
    PrestatairePage,
    LinkServicePrestationPage,
    AddPrestationDetailPage,
    DashboardPage,
    ValiderPrestatairePage,
    LinkPrestatairePrestataionPage,
    NotificationsPage,
    ChatPage,
    UtilisateurPage,
    UtilisateurDetailPage,
    CommandePage,
    DevisPage,
    CommandeHorairePage,
    CommandeForfaitPage,
    ProfilePage,
    CommandeHoraireDetailPage,
    CommandeForfaitDetailPage,
    DevisDetailPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),    
    SocketIoModule.forRoot(configChat),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    ServicePage,
    AddServicePage,
    AddPrestationPage,
    PrestationPage,
    PrestatairePage,
    LinkServicePrestationPage,
    AddPrestationDetailPage,
    DashboardPage,
    ValiderPrestatairePage,
    LinkPrestatairePrestataionPage,
    NotificationsPage,
    ChatPage,
    UtilisateurPage,
    UtilisateurDetailPage,
    CommandePage,
    DevisPage,
    CommandeHorairePage,
    CommandeForfaitPage,
    ProfilePage,
    CommandeHoraireDetailPage,
    CommandeForfaitDetailPage,
    DevisDetailPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    ServiceProvider,
    PrestationProvider,
    PrestataireProvider,
    ChatService,
    UtilisateurProvider,
    CommandeHoraireProvider,
    CommandeForfaitProvider,
    DevisProvider,
    CommandeProvider,
    PaypalProvider,
    OneSignal,
    NotificationProvider
  ]
})
export class AppModule {}
