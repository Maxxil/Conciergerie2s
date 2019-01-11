import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {HomePage} from "../home/home";
import {NotificationsPage} from "../notifications/notifications";
import {ChatPage} from "../chat/chat";

import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  tab1Root = HomePage;
  tab2Root = NotificationsPage;
  tab3Root = ChatPage;
  public totalNotification = 0;
  public chatnotification = 0;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    public notificationProv: NotificationProvider) {
    
    this.notificationProv.getAll().subscribe((results) =>{
      
      this.totalNotification = results.data.filter(this.filtrerNotification).length;     
      console.log('total notification init '+this.totalNotification)  ;       

      events.subscribe('notification:badge', payload => {    
        console.log('Event notification:badge');        
        this.totalNotification = payload._badgeValue;      
      });

      events.subscribe('notification:chat', payload => {    
        console.log('Event notification:chat');        
        this.chatnotification = payload._badgeValue;      
      });


      events.subscribe('notification:updated', () => {   
        console.log('Event notification:updated');  
        this.updateNotificationBadge();    
      });
    });
   
  }

  filtrerNotification(element) { 
    return (9 != element.type); 
  } 

  updateNotificationBadge() {
    this.notificationProv.getAll().subscribe((results) =>{
      console.log(results);
  
      this.totalNotification = results.data.filter(this.filtrerNotification).length; 
      console.log('total notification maj '+this.totalNotification)  ;     
    });  
  }

  ionViewDidLoad() { 
       this.updateNotificationBadge();
  }

}
