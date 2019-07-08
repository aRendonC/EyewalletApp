import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {VerificationModalPage} from "../verification-modal/verification-modal.page";
import {enterAnimation} from "../animations/enter";
import {leaveAnimation} from "../animations/leave";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  ctrlNavigation: boolean = false;
  imgLeft:string=null;
  imgRight:string=null;
  classLeft:string=null;
  bandera:string=null;
  pockets: any = []
  public crypto = [
    {name:"Bitcoin",background:"contentBitcoin"},
    {name:"Ethereum",background:"contentEtherium"}
  ];
  constructor(
      private route: ActivatedRoute,
      private modalCtrl: ModalController,
      private store: Storage,
      private aesjs: AesJsService
  ) {
    this.classLeft="resize-logo-left1";
    this.imgLeft = "../../assets/img/btn-left-s.svg";
    this.imgRight="../../assets/img/btn-right.svg";
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    console.log('estos son mis pockets', this.pockets)
  }


   ngOnInit() {
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
