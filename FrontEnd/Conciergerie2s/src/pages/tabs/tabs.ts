import { Component } from '@angular/core';

import {LoginPage} from "../login/login";
import {ServicesPage} from "../services/services";
import {ProfilePage} from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ServicesPage;
  tab2Root = LoginPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
