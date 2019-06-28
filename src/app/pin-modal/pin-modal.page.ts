import {Component, Inject, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.page.html',
  styleUrls: ['./pin-modal.page.scss'],
})
export class PinModalPage implements OnInit {

  modalTitle: string;
  modelID: number;
  constructor(
      private modalCtrl: ModalController,
      @Inject(NavParams) private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams)
    this.modelID = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    const onCloseData: string = 'Wrapped Up!';
    await this.modalCtrl.dismiss(onCloseData)
  }
}
