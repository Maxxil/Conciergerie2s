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

        this.notifications = results.data.filter(this.isnotArchived);   
              
        this.events.publish('notification:badge', { _badgeValue: results.data.filter(this.isnotRead).length}) ;        
      });
  }

ionViewDidLoad() {

    console.log('ionViewDidLoad NotificationsPage');
    //this.updateNotificationList();
    this.notificationProv.getAll().subscribe((results) =>{
      
      this.notifications = results.data.filter(this.isnotArchived); 
      
    });
}

isnotArchived(element: NotificationModel) {
  if(element.archiveBy.length)
    return (9 != element.type) && (!element.archiveBy.some(x => x.toString() == localStorage.getItem('IdUtilisateur')));
  else
    return (9 != element.type);
}


isnotRead(element: NotificationModel) {
  //console.log(element);
  if(element.readBy.length)
    return (9 != element.type && !element.readBy.some(x => x.toString() == localStorage.getItem('IdUtilisateur')));
  else
    return (9 != element.type);
}

archive(notification) {  
   this.notificationProv.archiveByMe(notification).subscribe(() =>{    
     notification.status = "1";
     notification.readBy.push(localStorage.getItem('IdUtilisateur'));
     let nb = this.notifications.filter(this.isnotRead).length;     
     this.events.publish('notification:badge', { _badgeValue: nb}) ;            
  });
}

  
delete(notification) {  
   this.notificationProv.delete(notification).subscribe(() =>{        
    let nb = this.notifications.filter(this.isnotArchived).length;    
    this.events.publish('notification:badge', { _badgeValue: nb}) ; 
  });
}

open(notification) {  
  this.notificationProv.readByMe(notification).subscribe((reult) =>{    
    notification.readBy.push(localStorage.getItem('IdUtilisateur'));
    let nb = this.notifications.filter(this.isnotRead).length;    
    this.events.publish('notification:badge', { _badgeValue: nb}) ; 
  });
} 


}

