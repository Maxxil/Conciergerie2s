import { Component } from '@angular/core';

import {ServicesPage} from "../services/services";
import {ChatPage} from "../chat/chat";
import {NotificationsPage } from "../notifications/notifications";
import {CommandesPage} from "../commandes/commandes";
import { Events } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ServicesPage;
  tab2Root = NotificationsPage;
  tab3Root = ChatPage;
  tab4Root = CommandesPage;
  public totalNotification = 0;
  public chatnotification = 0;
  constructor(public events: Events,
    public notificationProv: NotificationProvider) {

    this.notificationProv.getAll().subscribe((results) =>{      
        this.totalNotification = results.data.filter(this.filtrerNotification).length;                     
        events.subscribe('notification:badge', payload => {                    
          this.totalNotification = payload._badgeValue;      
        });        
      events.subscribe('notification:updated', () => {           
        this.updateNotificationBadge();    
      });

    });
  }

  filtrerNotification(element) { 
    return ((9 == element.type || 7 == element.type)
        && element.utilisateur._id ==  localStorage.getItem("IdUtilisateur")); 
  } 

  updateNotificationBadge() {
    this.notificationProv.getAll().subscribe((results) =>{      
      this.totalNotification = results.data.filter(this.filtrerNotification).length;           
    });  
  }

  ionViewDidLoad() { 
    this.updateNotificationBadge();
}

}


