import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { NotificationModel } from '../../model/Model/NotificationModel';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications : NotificationModel[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public notificationProv: NotificationProvider, 
    public events: Events) {
      this.notifications = [];    
      this.events.subscribe('notification:updated', () => {
        console.log('notification:updated');
        this.updateNotificationList();
      });
  }

  updateNotificationList() {
    this.notificationProv.getAll().subscribe((results) =>{
      console.log(results.data);
      this.notifications = results.data.filter(this.filtrerNotification);   
      console.log(this.notifications);
      this.events.publish('notification:badge', { _badgeValue: this.notifications.length}) ;        
    });
}


filtrerNotification(element: NotificationModel) { 
  return ((9 == element.type || 7 == element.type)
   && element.utilisateur._id ==  localStorage.getItem("IdUtilisateur")); 
} 

delete(notification) {
  console.log(notification);
   this.notificationProv.delete(notification).subscribe((result) =>{
    console.log(result);
    this.events.publish('notification:updated');
  });
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    this.updateNotificationList();
  }

} 
