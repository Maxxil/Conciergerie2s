import { Component } from '@angular/core';

import {ServicesPage} from "../services/services";
import {ChatPage} from "../chat/chat";
import {NotificationsPage } from "../notifications/notifications";
import {CommandesPage} from "../commandes/commandes";
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ServicesPage;
  tab2Root = NotificationsPage;
  tab3Root = ChatPage;
  tab4Root = CommandesPage;

  constructor() {

  }
}


