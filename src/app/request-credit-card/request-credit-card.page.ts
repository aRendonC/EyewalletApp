import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataLocalService } from '../services/data-local/data-local.service';
import * as CONSTANTS from '../constanst';
import { ModalInvoicePage } from '../modal-invoice/modal-invoice.page';
import { ToastService } from '../services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';

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
  public dataProfile: any = {};
  public showContentLogo: boolean = true;
  public valuesDataProfile: any[] = [];
  public stateTermsConditions: boolean = true;
  public pockets: any[] = [];
  public pocketSelected: any;
  public statePocketBalance: boolean = false;
  public stateButtonToggle: boolean = false;

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
    private router: Router,
    private modalController: ModalController,
    private storage: DataLocalService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

  public async ngOnInit() {
    this.dataProfile = await this.getDataProfile();
    this.setDataProfile(this.dataProfile);
    this.pockets = await this.getDataListPockets();
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
    return await this.storage.getDataLocal('pockets');

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
    return await this.dataLocalService.getDataLocal('profile');
  }

  public showForm(): void {
    this.listenerPocketSelected();
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
    const modalInvoice = await this.modalController.create({
      component: ModalInvoicePage,
      componentProps: {
        dataPocket: this.pocketSelected
      }
    });

    return await modalInvoice.present();
  }

  public async listenerPocketSelected(): Promise<any> {
    if (this.pocketSelected.balance > 0) {
      this.statePocketBalance = true;
      this.stateTermsConditions = !(this.stateButtonToggle && this.statePocketBalance);
    } else {
      this.statePocketBalance = false;
      this.toastService.presentToast({text: this.translateService.instant('REQUEST_CREDIT_CAR_PAGE.MessageNoBalance')});
    }
  }

  public handlerToggle(event) {
    this.stateButtonToggle = event.detail.checked;
    if (this.statePocketBalance && this.stateButtonToggle) {
      this.stateTermsConditions = !(this.stateButtonToggle && this.statePocketBalance);
    } else {
      this.toastService.presentToast({text: this.translateService.instant('REQUEST_CREDIT_CAR_PAGE.MessageNoBalance')});
    }
  }
}
