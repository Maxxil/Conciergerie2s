import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { NotificationModel } from '../../model/Models/NotificationModel';
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
        
        this.updateNotificationList();
      });
    }

  updateNotificationList() {
      this.notificationProv.getAll().subscribe((results) =>{

        function filtrer(element) { 
          return (9 != element.type); 
        } 
        
        this.notifications = results.data.filter(filtrer);   
        
        this.events.publish('notification:badge', { _badgeValue: this.notifications.length}) ;        
      });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad NotificationsPage');
    this.updateNotificationList();
  }

  
delete(notification) {
  console.log(notification);
   this.notificationProv.delete(notification).subscribe((result) =>{    
    this.events.publish('notification:updated');
  });
}

open(notification) {
  console.log('Open notification:',notification);
} 


}

