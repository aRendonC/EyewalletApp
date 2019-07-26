// Dependencies.
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import {Storage} from "@ionic/storage";

// Services.
import { DataLocalService } from '../services/data-local/data-local.service';
import { AesJsService } from '../services/aesjs/aes-js.service';

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
  @ViewChild(IonContent) content: IonContent;
  // Text html.
  public title: string = CONSTANTS.REQUEST_CARD.REQUEST_CARD;
  public termsConditions: string = CONSTANTS.REQUEST_CARD.TERMS_CONDITIONS;
  public buttonCancel: string = CONSTANTS.REQUEST_CARD.BUTTON_CANCEL;
  public buttonAccept: string = CONSTANTS.REQUEST_CARD.BUTTON_ACCEPT;

  public dataProfile: any = {};
  public showContentLogo: boolean = true;
  public valuesDataProfile: any[] = [];
  public stateTermsConditions: boolean = true;
  public pockets: any[] = [];
  public pocketSelected: any;

  public keysDataProfile: any[] = [
    CONSTANTS.REQUEST_CARD.NAME,
    CONSTANTS.REQUEST_CARD.COUNTRY,
    CONSTANTS.REQUEST_CARD.EMAIL,
    CONSTANTS.REQUEST_CARD.ID,
    CONSTANTS.REQUEST_CARD.RESIDENCE
  ];
  ctrlNavigation: number = 4;

  constructor(
    private dataLocalService: DataLocalService,
    private aesJsService: AesJsService,
    private router: Router,
    private modalController: ModalController,
    private storage: Storage,
  ) { }

  public async ngOnInit() {
    this.dataProfile = await this.getDataProfile();
    this.setDataProfile(this.dataProfile);
    this.pockets = await this.getDataListPockets();
    console.log(this.pockets)
    this.pocketSelected = this.pockets[0];
  }

  public ionViewDidEnter(): void {
    let elementDashboard: any = document.getElementsByTagName('app-request-credit-card');
    elementDashboard[0].classList.add("margins-dashboard")
  }

  public ionViewWillLeave(): void {
    if (this.showContentLogo === false) {
      this.content.scrollToTop();
      this.showForm();
    }
  }

  private async getDataListPockets(): Promise<any[]> {
    const dataPockets = await this.storage.get('pocket');
    return this.aesJsService.decrypt(dataPockets)
  }

  private setDataProfile(dataProfile: any): void {
    this.valuesDataProfile = [
      `${this.validateDataProfile(dataProfile.user.firstName)} ${this.validateDataProfile(dataProfile.user.lastName)}`,
      `${this.validateDataProfile(dataProfile.country)}`,
      `${this.validateDataProfile(dataProfile.user.email)}`,
      `${this.validateDataProfile(dataProfile.identification)}`,
      'Valor indefinido'
    ];
  }

  private validateDataProfile(validateData): any {
    return validateData !== null ? validateData : 'Por favor complete su perfil';
  }

  private async getDataProfile(): Promise<any> {
    const dataProfileEncrypt = await this.dataLocalService.getDataLocal('profile');
    return this.aesJsService.decrypt(dataProfileEncrypt);
  }

  public showForm(): void {
    this.showContentLogo = !this.showContentLogo;
  }

  public async buttonCancelNavigate(): Promise<any> {
    if (this.showContentLogo === false) {
      this.content.scrollToTop();
      this.showForm();
      await this.router.navigate(['/app/tabs/dashboard']);
    }
  }

  public async buttonAcept(): Promise<any> {
    await this.showModalInvoice();
  }

  public async showModalInvoice(): Promise<any> {
    const modalInvoice = await this.modalController.create({
      component: ModalInvoicePage,
      componentProps: {
        dataPocket: this.pocketSelected
      }
    });

    return await modalInvoice.present();
  }

  public handlerToggle(event) {
    this.stateTermsConditions = !event.detail.checked;
  }
}
