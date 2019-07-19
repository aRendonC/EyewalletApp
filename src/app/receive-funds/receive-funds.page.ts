// Dependencies.
import {Component} from '@angular/core';
// Constants.
import * as CONSTANTS from '../constanst';
import {ActivatedRoute} from '@angular/router';
// Plugins cordova.
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {ToastService} from "../services/toast/toast.service";

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
    private toastController: ToastService
  ) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter')
    const data = JSON.parse(this.activateRouter.snapshot.queryParamMap.get('pocket'));
    this.amount = data.balance;
    this.codeQr = data.address;
  }

  public async copyCode(): Promise<any> {
    await this.clipboard.copy(this.codeQr);
    await this.toastController.presentToast({text: CONSTANTS.RECEIVE_FUNDS.MESSAGE_COPY});
  }
}
