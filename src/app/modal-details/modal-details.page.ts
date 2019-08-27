import { Component, OnInit, Input } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.page.html',
  styleUrls: ['./modal-details.page.scss'],
})
export class ModalDetailsPage implements OnInit {
  @Input() datos;
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  loadData(){
    console.log(this.datos);
  }


}
