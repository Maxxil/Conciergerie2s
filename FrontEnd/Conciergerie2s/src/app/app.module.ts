import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {InAppBrowser} from "@ionic-native/in-app-browser";



import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {ServicesPage} from "../pages/services/services";


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
import {CommandeSpecialiseePage} from "../pages/commande-specialisee/commande-specialisee";
import {CommandeForfaitPage} from "../pages/commande-forfait/commande-forfait";
import {DevisPage} from "../pages/devis/devis";
import { CommandeForfaitProvider } from '../providers/commande-forfait/commande-forfait';
import { CommandeSpcialiseeProvider } from '../providers/commande-specialisee/commande-specialisee';
import { DevisProvider } from '../providers/devis/devis';
import {CommandesPage} from '../pages/commandes/commandes';
import { CommandeProvider } from '../providers/commande/commande';
import {MenuPage} from "../pages/menu/menu";
import {CommandeSpecialiseeDetailPage} from "../pages/commande-specialisee-detail/commande-specialisee-detail";
import {CommandeForfaitDetailPage} from "../pages/commande-forfait-detail/commande-forfait-detail";
import {DevisDetailPage} from "../pages/devis-detail/devis-detail";
import {CommandesPostulerPage} from "../pages/commandes-postuler/commandes-postuler";
import {MesCommandesPostuleesPage} from "../pages/mes-commandes-postulees/mes-commandes-postulees";
import { PaypalProvider } from '../providers/paypal/paypal';


import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { OneSignal } from '@ionic-native/onesignal';

import { CHAT_URL } from '../model/Url';
import { MotDePasseOublieProvider } from '../providers/mot-de-passe-oublie/mot-de-passe-oublie';
import {MotDePasseOubliePage} from "../pages/mot-de-passe-oublie/mot-de-passe-oublie";
import { ChangerMotDePasseProvider } from '../providers/changer-mot-de-passe/changer-mot-de-passe';
import {ChangerMotDePassePage} from "../pages/changer-mot-de-passe/changer-mot-de-passe";
import {MentionsPage}  from "../pages/mentions/mentions"
import { CgvPage } from "../pages/cgv/cgv";
import { NotificationProvider } from '../providers/notification/notification';


const configChat: SocketIoConfig = { url: CHAT_URL, options: {}} ;

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
    CommandeSpecialiseePage,
    CommandeForfaitPage,
    DevisPage,
    CommandesPage,
    MenuPage,
    CommandeSpecialiseeDetailPage,
    CommandeForfaitDetailPage,
    DevisDetailPage,
    CommandesPostulerPage,
    MotDePasseOubliePage,
    ChangerMotDePassePage,
    MesCommandesPostuleesPage,
    CgvPage,
    MentionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre' ],
      monthShortNames: ['jan', 'fev', 'mar', 'avr', 'mai', 'jui', 'jui', 'aou', 'sep', 'oct', 'nov', 'dec' ],
      dayNames:['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],
      dayShortNames:['dim','lun','mar','mer','jeu','ven','sam'],
  }),
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
    CommandeSpecialiseePage,
    CommandeForfaitPage,
    DevisPage,
    CommandesPage,
    MenuPage,
    CommandeSpecialiseeDetailPage,
    CommandeForfaitDetailPage,
    DevisDetailPage,
    CommandesPostulerPage,
    MotDePasseOubliePage,
    ChangerMotDePassePage,
    MesCommandesPostuleesPage,
    CgvPage,
    MentionsPage
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
    CommandeSpcialiseeProvider,
    DevisProvider,
    CommandeProvider,
    PaypalProvider,
    InAppBrowser,
    ChatService,
    MotDePasseOublieProvider,
    ChangerMotDePasseProvider,
    OneSignal,
    NotificationProvider
  ]
})
export class AppModule {}
