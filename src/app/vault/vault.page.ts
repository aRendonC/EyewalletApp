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

  public continueCreateVault(): void {
    console.log('Continue...');
    
  }
}
