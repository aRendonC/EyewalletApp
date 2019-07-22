import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-invoice',
  templateUrl: './card-invoice.page.html',
  styleUrls: ['./card-invoice.page.scss'],
})
export class CardInvoicePage implements OnInit {
    ctrlNavigation: number = 4;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    let elementDashboard: any = document.getElementsByTagName('app-card-invoice')
    console.log(elementDashboard)
    elementDashboard[0].classList.add("margins-dashboard")
  }

}
