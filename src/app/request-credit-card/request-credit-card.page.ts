// Dependencies.
import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Storage} from "@ionic/storage";

// Services.
import { DataLocalService } from '../services/data-local/data-local.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { AuthService } from '../services/auth/auth.service';
import { AxiosService } from '../services/axios/axios.service';

// Constants.
import * as CONSTANTS from '../constanst';

// Pages.
import { ModalInvoicePage } from '../modal-invoice/modal-invoice.page';

@Component({
  selector: 'app-request-credit-card',
  templateUrl: './request-credit-card.page.html',
  styleUrls: ['./request-credit-card.page.scss'],
})

export class RequestCreditCardPage implements OnInit {
  // Text html.
  public title: string = CONSTANTS.REQUEST_CARD.REQUEST_CARD;
  public termsConditions: string = CONSTANTS.REQUEST_CARD.TERMS_CONDITIONS;
  public buttonCancel: string = CONSTANTS.REQUEST_CARD.BUTTON_CANCEL;
  public buttonAccept: string = CONSTANTS.REQUEST_CARD.BUTTON_ACCEPT;
  public incompleteProfile: string = CONSTANTS.REQUEST_CARD.INCOMPLETE_PROFILE;

  public dataProfile: any = {};
  public showContentLogo: boolean = true;
  public valuesDataProfile: any[] = [];
  public stateTermsConditions: boolean = true;
  public pocket: any = null
  public pockets: [] = []

  public keysDataProfile: any[] = [
    CONSTANTS.REQUEST_CARD.NAME,
    CONSTANTS.REQUEST_CARD.COUNTRY,
    CONSTANTS.REQUEST_CARD.EMAIL,
    CONSTANTS.REQUEST_CARD.ID,
    CONSTANTS.REQUEST_CARD.RESIDENCE
  ];

  constructor(
    private dataLocalService: DataLocalService,
    private aesJsService: AesJsService,
    private router: Router,
    private authService: AuthService,
    private axiosService: AxiosService,
    private toastController: ToastController,
    private modalController: ModalController,
    private storage: Storage
  ) { }

  public async ngOnInit() {
    this.dataProfile = await this.getDataProfile();
    this.pockets = await this.storage.get('pockets')
    this.pockets = this.aesJsService.decrypt(this.pockets)
    const dataUser = this.dataProfile;
    console.log(this.dataProfile)
    this.valuesDataProfile = [
      `${dataUser.user.firstName} ${dataUser.user.lastName}`,
      `${dataUser.country}`,
      `${dataUser.user.email}`,
      `${dataUser.user.id}`,
      'null'
    ];
  }

  private async getDataProfile(): Promise<any> {
    const dataProfileEncrypt = await this.dataLocalService.getDataLocal('profile');
    return this.aesJsService.decrypt(dataProfileEncrypt);
  }

  public showForm(): void {
    this.showContentLogo = false;
  }

  public setImageLogoCard(): string {
    return `../../assets/${this.showContentLogo ? 'img/home-logo.svg' : 'images/image-card.svg'}`;
  }

  public async buttonCancelNavigate(): Promise<any> {
    await this.router.navigate(['/app/tabs']);
  }

  public async buttonAcept(): Promise<any> {
    console.log(this.pocket)
    const path = 'card-request/request';
    this.axiosService.post(path, {address: this.pocket.address}, this.authService)
    .then(async response => {
      console.log('pedido de tarjeta', response)
      await this.getResponseRequestCard(response);
    })
    .catch(async error => {
      await this.presentToast(CONSTANTS.MESSAGE_ERROR.CONNECTIVITY_PROBLEMS);
    });
  }

  public async getResponseRequestCard(data) {
    if (data.status === 200) {
      await this.showModalInvoice();
    } else {
      await this.presentToast(CONSTANTS.REQUEST_CARD.MESSAGE_NO_CARD);
    }
  }

  public async showModalInvoice(): Promise<any> {
    const modalInvoice = await this.modalController.create({
      component: ModalInvoicePage
    });

    return await modalInvoice.present();
  }

  public handlerToggle(event) {
    this.stateTermsConditions = !event.detail.checked;
  }

  public async presentToast(messageInfo: string) {
    const toast = await this.toastController.create({
      message: messageInfo,
      duration: 3000
    });

    await toast.present();
  }
}
