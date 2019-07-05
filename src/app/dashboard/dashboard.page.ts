import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public crypto = [
    {name:"Bitcoin",background:"contentBitcoin"},
    {name:"Ethereum",background:"contentEtherium"}
  ];
  constructor() {

    
  }


  ngOnInit() {
  }

}
