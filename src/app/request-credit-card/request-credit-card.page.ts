// Dependencies.
import { Component, OnInit } from '@angular/core';

// Services.
import { DataLocalService } from '../services/data-local/data-local.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { AuthService } from '../services/auth/auth.service';

// Routes.
import { Router } from '@angular/router';

// Constants.
import * as CONSTANTS from '../constanst';
import { AxiosService } from '../services/axios/axios.service';
import { ToastController } from '@ionic/angular';

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

  public dataProfile: any = {};
  public showContentLogo: boolean = true;
  public valuesDataProfile: any[] = [];
  public stateTermsConditions: boolean = true;

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
    private toastController: ToastController
  ) { }

  public async ngOnInit() {
    this.dataProfile = await this.getDataProfile();
    const dataUser = this.dataProfile.data
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
    return `../../assets/${this.showContentLogo ? 'img/home-logo.svg' : 'images/image-card.svg'}`
  }

  public async buttonCancelNavigate(): Promise<any> {
    await this.router.navigate(['/app/tabs']);
  }

  public buttonAcept(): void {
    this.requestCard();
  }

  public async requestCard(): Promise<any> {
    const path = 'card-request/request';
    this.axiosService.post(path, {}, this.authService)
    .then(response => {
      console.log(response);
      if (response.status !== 200) {
        this.presentToast();
      }
    });
  }

  public handlerToggle(event) {
    this.stateTermsConditions = !event.detail.checked;
  }

  private async presentToast() {
    const toast = await this.toastController.create({
      message: CONSTANTS.REQUEST_CARD.MESSAGE_NO_CARD,
      duration: 3000
    });

    toast.present();
  }
}
