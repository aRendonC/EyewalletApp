// Dependencies.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.page.html',
  styleUrls: ['./vault.page.scss'],
})
export class VaultPage implements OnInit {
  public buttonDisabled: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }

  public continueCreateVault(): void {
    this.router.navigate(['vault-created']);
  }
}
