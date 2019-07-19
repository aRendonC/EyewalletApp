// Dependencies.
import {Component} from '@angular/core';
import {ToastController} from '@ionic/angular';
// Constants.
import * as CONSTANTS from '../constanst';
import {ActivatedRoute} from '@angular/router';
// Plugins cordova.
import {Clipboard} from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-receive-funds',
  templateUrl: './receive-funds.page.html',
  styleUrls: ['./receive-funds.page.scss'],
})

export class ReceiveFundsPage {
  public textAmount: string = CONSTANTS.RECEIVE_FUNDS.AMOUNT;
  public buttonCopy: string = CONSTANTS.RECEIVE_FUNDS.BUTTON_COPY;
  public ctrlNavigation: number = 1;

  public amount = null;
  public codeQr = null;
  public addressCodeQR = null;

  constructor(
    private activateRouter: ActivatedRoute,
    private clipboard: Clipboard,
    private toastController: ToastController
  ) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter')
    const data = JSON.parse(this.activateRouter.snapshot.queryParamMap.get('pocket'));
    this.amount = data.balance;
    this.codeQr = data.address;
  }

  public copyCode(): void {
    this.clipboard.copy(this.codeQr);
    this.presentToast();
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      message: CONSTANTS.RECEIVE_FUNDS.MESSAGE_COPY,
      duration: 2000
    });

    toast.present();
  }
}
