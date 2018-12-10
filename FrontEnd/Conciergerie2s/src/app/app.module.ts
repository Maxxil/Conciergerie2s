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
import { ChatService } from "../providers/chat/chat-service";
import {PrestationsPage} from "../pages/prestations/prestations";
import { PrestationProvider } from '../providers/prestation/prestation';
import {LoginProvider} from "../providers/login/login";
import {CommandeHorairePage} from "../pages/commande-horaire/commande-horaire";
import {CommandeForfaitPage} from "../pages/commande-forfait/commande-forfait";
import {DevisPage} from "../pages/devis/devis";
import { CommandeForfaitProvider } from '../providers/commande-forfait/commande-forfait';
import { CommandeHoraireProvider } from '../providers/commande-horaire/commande-horaire';
import { DevisProvider } from '../providers/devis/devis';
import {CommandesPage} from '../pages/commandes/commandes';
import { CommandeProvider } from '../providers/commande/commande';
import {MenuPage} from "../pages/menu/menu";
import {CommandeHoraireDetailPage} from "../pages/commande-horaire-detail/commande-horaire-detail";
import {CommandeForfaitDetailPage} from "../pages/commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../pages/devis-detail/devis-detail";
import {CommandesPostulerPage} from "../pages/commandes-postuler/commandes-postuler";
import { PaypalProvider } from '../providers/paypal/paypal';
import {InAppBrowser} from "@ionic-native/in-app-browser";

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const configChat: SocketIoConfig = { url: 'http://localhost:5555', options: {}} ;

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
    CommandeHorairePage,
    CommandeForfaitPage,
    DevisPage,
    CommandesPage,
    MenuPage,
    CommandeHoraireDetailPage,
    CommandeForfaitDetailPage,
    DevisDetailPage,
    CommandesPostulerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(configChat),
    HttpClientModule,
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
    CommandeHorairePage,
    CommandeForfaitPage,
    DevisPage,
    CommandesPage,
    MenuPage,
    CommandeHoraireDetailPage,
    CommandeForfaitDetailPage,
    DevisDetailPage,
    CommandesPostulerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    UtilisateurProvider,
    PrestationProvider,
    LoginProvider,
    CommandeForfaitProvider,
    CommandeHoraireProvider,
    DevisProvider,
    CommandeProvider,
    PaypalProvider,
    InAppBrowser,
    ChatService
  ]
})
export class AppModule {}
