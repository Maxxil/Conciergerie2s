import { Component, ViewChild } from '@angular/core';
import { App, Platform, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";

import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal'
import { oneSignalAppId, sender_id } from '../model/Url';
import { Socket } from 'ng-socket-io';
import {ChatPage} from "../pages/chat/chat";

import { NotificationEnum } from "../model/Enums/NotificationEnum";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage:any = LoginPage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private oneSignal: OneSignal, 
    public events: Events,
    public socket: Socket,
    public appCtrl: App ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if(this.isCordovaAvailable()) {
        this.oneSignal.startInit(oneSignalAppId, sender_id);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }
    });
  }

  isCordovaAvailable() {
    if (!(<any>window).cordova) {
     // alert('This is a native feature. Please use a device');
      return false;
    }
    
    return true;
  }

  private onPushReceived(payload: OSNotificationPayload) {
   
    let additionalData = payload.additionalData;
    let message = payload.body; 
   
    this.events.publish('notification:updated');
    alert(message)
     if (additionalData != null)
     {     
       switch(additionalData["type"]) {
         case  'chat-request': 
           localStorage.setItem('chat-request',JSON.stringify(additionalData));
           localStorage.setItem('redirect',additionalData["type"]);
           this.events.publish('chat:request');
           break;
         case NotificationEnum.NOUVELLE_COMMANDE: 
           //this.nav.push(ChatPage);
           //this.appCtrl.getRootNav().push(ChatPage);        
           break;
       
       }      
       //alert('Push opened additionalData: ' + additionalData);
     }
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
      
    var additionalData = payload.additionalData;
    let message = payload.body;
  
    //alert('Push opened body: ' + message);
    if (additionalData != null)
    {     
      switch(additionalData["type"]) {
        case  'chat-request': 
          localStorage.setItem('chat-request',JSON.stringify(additionalData));
          localStorage.setItem('redirect',additionalData["type"]);
          this.events.publish('chat:request');
          break;
        case NotificationEnum.NOUVELLE_COMMANDE: 
          //this.nav.push(ChatPage);
          //this.appCtrl.getRootNav().push(ChatPage);        
          break;
      
      }
      //alert('Push opened additionalData: ' + additionalData);
    }
  }
}
