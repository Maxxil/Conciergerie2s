import { Component } from '@angular/core';

import {ServicesPage} from "../services/services";
import {ChatPage} from "../chat/chat";
import {NotificationsPage } from "../notifications/notifications";
import {ProfilePage} from "../profile/profile";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ServicesPage;
  tab2Root = NotificationsPage;
  tab3Root = ChatPage;
  tab4Root = ProfilePage;
  tab5Root = ProfilePage;

  constructor() {

  }
}


