import {Component, Inject, Input, OnInit} from '@angular/core';
import {ModalController, NavParams, } from '@ionic/angular';

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.page.html',
  styleUrls: ['./pin-modal.page.scss'],
})
export class PinModalPage implements OnInit {
  @Input() modalTitle: string;
  @Input() modelID: number;
  @Input() middleInitial: string;


  constructor(
      private modalCtrl: ModalController,
      public navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    // console.table(this.modalTitle);
    // this.modelID = this.navParams.data.paramID;
    // this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onCloseData = 'Wrapped Up!';
    this.modalCtrl.dismiss(onCloseData);
  }
}
