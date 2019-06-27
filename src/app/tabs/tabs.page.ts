import {Component} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private auth: AuthService) {
  }

  logOut() {
    this.auth.logout();
  }

}
