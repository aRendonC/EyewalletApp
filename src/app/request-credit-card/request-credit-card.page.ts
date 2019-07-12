import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-credit-card',
  templateUrl: './request-credit-card.page.html',
  styleUrls: ['./request-credit-card.page.scss'],
})
export class RequestCreditCardPage implements OnInit {
  public showContentLogo: boolean = true;
  public itemsDataProfile: any = [
    'name',
    'country',
    'email',
    'id',
    'residence'
  ];

  constructor() { }

  ngOnInit() {
  }

  public showForm(): void {
    console.log('Show form...');
    this.showContentLogo = false;
  }

  public setImageLogoCard(): string {
    return `../../assets/${this.showContentLogo ? 'img/home-logo.svg' : 'images/image-card.svg'}`
  }

  public buttonCancel(): void {
    console.log('Cancel...');
  }

  public buttonAcept(): void {
    console.log('Acept...');
  }
}
