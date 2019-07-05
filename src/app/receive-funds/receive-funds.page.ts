// Dependencies.
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

// Constants.
import * as CONSTANTS from '../constanst';
import { ActivatedRoute } from '@angular/router';

// Plugins cordova.
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-receive-funds',
  templateUrl: './receive-funds.page.html',
  styleUrls: ['./receive-funds.page.scss'],
})

export class ReceiveFundsPage implements OnInit {
  public textAmount: string = CONSTANTS.RECEIVE_FUNDS.AMOUNT;
  public amount: number = 0.1245788587878;
  public buttonCopy: string = CONSTANTS.RECEIVE_FUNDS.BUTTON_COPY;
  public test: object = {}
  public codeReceive: string = 'aaafajskdlfjklasjdkflajskldfjasldkfjñl';

  constructor(
    private activateRouter: ActivatedRoute,
    private clipboard: Clipboard,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.test = await JSON.parse(this.activateRouter.snapshot.paramMap.get('pocket'));
  }

  public copyCode(): void {
    this.clipboard.copy(this.codeReceive);
    console.log(this.codeReceive);
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
