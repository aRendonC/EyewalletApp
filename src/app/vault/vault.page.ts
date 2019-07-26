// Dependencies.
import { Component, OnInit } from '@angular/core';

// Constants.

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
    let elementDashboard: any = document.getElementsByTagName('app-vault');
    elementDashboard[0].classList.add("margins-dashboard")
  }

  public continueCreateVault(): void {

  }
}
