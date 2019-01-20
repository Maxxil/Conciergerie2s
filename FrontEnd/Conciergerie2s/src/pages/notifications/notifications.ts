import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { NotificationModel } from '../../model/Model/NotificationModel';
import { NotificationEnum } from '../../model/Enums/NotificationEnum'
import {DevisDetailPage} from '../../pages/devis-detail/devis-detail';
import {DevisProvider} from '../../providers/devis/devis'

//import {CommandeForfaitDetailPage} from '../../pages/commande-forfait-detail';
//import {CommandeHoraireDetailPage} from '../../pages/commande-horaire-detail';

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
    public events: Events,
    public devisPvd : DevisProvider) {
      this.notifications = [];    
      this.events.subscribe('notification:updated', () => {
        console.log('notification:updated');
        this.updateNotificationList();
      });
  }

  updateNotificationList() {
    this.notificationProv.getAll().subscribe((results) =>{      
      this.notifications = results.data.filter(this.filtrerNotification);         
      this.events.publish('notification:badge', { _badgeValue: this.notifications.length}) ;        
    }); 
}


filtrerNotification(element: NotificationModel) { 
  return ((9 == element.type || 7 == element.type)
   && element.utilisateur._id ==  localStorage.getItem("IdUtilisateur")); 
} 

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
    this.updateNotificationList();
  }

  delete(notification) {
    console.log(notification);
     this.notificationProv.delete(notification).subscribe((result) =>{
      console.log(result);
      this.events.publish('notification:updated');
    });
  }

  open(notification: NotificationModel) {
    console.log(notification);
    switch(notification.type) {
      case NotificationEnum.DEVIS_A_REGLER: 
        console.log('devis à régler : '+notification.refId); 
        this.devisPvd.get(notification.refId).subscribe(result => {
          console.log(result);
          this.navCtrl.push(DevisDetailPage, {'Commande': result.data[0]});
        });                
        break;
    }
     
  }

} 
