import {Component} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {LoadingService} from "../services/loading/loading.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  ctrlCssBlur: boolean = false
  constructor(
      private auth: AuthService,
      private loadControl: LoadingService
  ) {
  }

  logOut() {
    this.auth.logout();
    
  }
  verifiLoading(data: boolean) {
    this.ctrlCssBlur = data
  }
}
