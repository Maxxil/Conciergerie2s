import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {ProfilePage} from "../pages/profile/profile";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private modalCtrl : ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.rootPage = LoginPage;
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
}
