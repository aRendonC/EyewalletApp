import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vault-created',
  templateUrl: './vault-created.page.html',
  styleUrls: ['./vault-created.page.scss'],
})
export class VaultCreatedPage implements OnInit {
  public buttonDisabled: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  public acceptCreationVault(): void {
    console.log('Creating...');
  }
}
