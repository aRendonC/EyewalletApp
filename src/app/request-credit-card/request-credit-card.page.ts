import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-credit-card',
  templateUrl: './request-credit-card.page.html',
  styleUrls: ['./request-credit-card.page.scss'],
})
export class RequestCreditCardPage implements OnInit {
  public showContentLogo: boolean = true;
  public itemsDataProfile: any = {
    name: 'Name',
    country: 'Country',
    email: 'Email',
    id: 'Id',
    residence: 'Residence'
  };

  constructor() { }

  ngOnInit() {
  }

  public showForm(): void {
    console.log('Show form...');
    this.showContentLogo = false;
  }
}
