import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {VerificationModalPage} from "../verification-modal/verification-modal.page";
import {enterAnimation} from "../animations/enter";
import {leaveAnimation} from "../animations/leave";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  imgLeft:string=null;
  imgRight:string=null;
  classLeft:string=null;
  bandera:string=null;
  pockets: any = []

  constructor(
      private route: ActivatedRoute,
      private modalCtrl: ModalController
  ) {
    this.classLeft="resize-logo-left1";
    this.imgLeft = "../../assets/img/btn-left-s.svg";
    this.imgRight="../../assets/img/btn-right.svg";

  }


  ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
  }
  async openModalVerification() {
    const modal = await this.modalCtrl.create({
      component: VerificationModalPage,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation
    })
    return await modal.present()
  }
  enviar(){}

  recibir(){

  }

}
