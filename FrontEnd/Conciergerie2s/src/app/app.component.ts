import { Component } from '@angular/core';
import { Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {ProfilePage} from "../pages/profile/profile";

import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal'
import { oneSignalAppId, sender_id } from '../model/Url';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private modalCtrl : ModalController, private oneSignal: OneSignal, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.rootPage = LoginPage;
      if(this.isCordovaAvailable()) {
          this.oneSignal.startInit(oneSignalAppId, sender_id);

          this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
          this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));

          this.oneSignal.getIds().then(ids => {
          localStorage.setItem('playerID',  ids.userId);

        });
       // this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }
    });



    platform.resume.subscribe(() =>{

    });

    platform.pause.subscribe(() =>{

    })
  }

  displayProfile(){
    const modal = this.modalCtrl.create(ProfilePage);
    modal.present();
  }

  showSetting() {
    return localStorage.getItem("IdUtilisateur") != null;
  }

  isCordovaAvailable() {
    if (!(<any>window).cordova) {
     // alert('This is a native feature. Please use a device');
      return false;
    }

    return true;
  }

  private onPushReceived(payload: OSNotificationPayload) {
    if(localStorage.getItem("IdUtilisateur") == payload.additionalData.userid) {
      alert(payload.body);
      this.events.publish('notification:updated');
    }
  }

}

