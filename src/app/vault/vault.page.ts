// Dependencies.
import { Component, OnInit } from '@angular/core';

// Constants.
import * as CONSTANTS from '../constanst';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.page.html',
  styleUrls: ['./vault.page.scss'],
})
export class VaultPage implements OnInit {
  public buttonDisabled: boolean = true;
  ctrlNavigation: number = 5;

  constructor() { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    let elementDashboard: any = document.getElementsByTagName('app-vault')
    console.log(elementDashboard)
    elementDashboard[0].classList.add("margins-dashboard")
  }

  public continueCreateVault(): void {
    console.log('Continue...');

  }
}
