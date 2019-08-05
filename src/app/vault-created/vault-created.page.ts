import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalResponseStatusPage } from '../modal-response-status/modal-response-status.page';
import { ActivatedRoute, Router } from '@angular/router';
import * as CONSTANTS from '../constanst';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../services/loading/loading.service';
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { DataLocalService } from '../services/data-local/data-local.service';

@Component({
  selector: 'app-vault-created',
  templateUrl: './vault-created.page.html',
  styleUrls: ['./vault-created.page.scss'],
})

export class VaultCreatedPage implements OnInit {
  public ctrlNavigation: number;
  public buttonDisabled: boolean;
  public dataVaultCreated: any;
  public USDtext: string;
  public shortNameCurrency: string;
  public nameCurrency: string;
  public amountCurrency: number;
  public amountUSD: number;
  public dataBody: any;

  constructor(
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private loadingService: LoadingService,
    private axiosService: AxiosService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private aesJsService: AesJsService,
    private dataLocalService: DataLocalService
  ) {
    this.ctrlNavigation = 6;
    this.buttonDisabled = false;
    this.USDtext = CONSTANTS.VAULT.USD;
  }

  ngOnInit() {
    this.dataVaultCreated = JSON.parse(this.activatedRoute.snapshot.paramMap.get('dataVaultCreated'));
    this.shortNameCurrency = this.dataVaultCreated.shortNameCurrency;
    this.nameCurrency = this.dataVaultCreated.nameCurrency;
    this.amountCurrency = this.dataVaultCreated.amount;
    this.amountUSD = this.dataVaultCreated.amountUSD;
    this.dataBody = this.getDataCreateVault(this.dataVaultCreated);
  }

  private getDataCreateVault(dataVault: any): any {
    return {
      userId: dataVault.userId,
      amount: dataVault.amount,
      address: dataVault.address,
      plan: dataVault.plan,
      currencyId: dataVault.currencyId,
      priority: dataVault.priority,
    }
  }

  public async acceptCreationVault(): Promise<any> {
    await this.runVaultCreation();
  }

  private async runVaultCreation(): Promise<any> {
    const url: string = 'vault/create';
    await this.loadingService.present({text: this.translateService.instant('VAULT_CREATED.messageCreatinVault'), classColorText: 'loadingTextBlack'});
    this.axiosService.post(url, this.dataBody, this.authService)
    .then(async response => {
      this.validateRunVaultCreation(response);
    })
    .catch(async error => {
      console.error(error);
      this.errorResponseQueries();
      await this.loadingService.dismiss();
    });
  }

  private async validateRunVaultCreation(dataResponse: any): Promise<any> {
    console.log('RESPONSE: ', dataResponse);
    if (dataResponse.status === 200) {
      this.setDataLocalPockets(dataResponse.wallets);
      await this.loadingService.dismiss();
      this.showModalResponseStatus(0, this.translateService.instant('VAULT_CREATED.modalMessageSuccessText'));
    } else {
      await this.loadingService.dismiss();
      this.showModalResponseStatus(1, this.translateService.instant('VAULT_CREATED.modalMessageErrorText'));
    }
  }

  private async setDataLocalPockets(pockets: any[]): Promise<any> {
    const pocketsEncrypt: any = this.aesJsService.encrypt(pockets);
    this.dataLocalService.setDataLocal(CONSTANTS.KEYS_DATA_LOCAL.POCKETS, pocketsEncrypt);
  }

  private errorResponseQueries(): void {
    this.toastService.presentToast({text: this.translateService.instant('VAULT.messageErrorLoadPage')});
    this.router.navigate(['/app/tabs/vault']);
  }

  private async showModalResponseStatus(typeIcon: number, message: string): Promise<any> {
    const modalResponseStatus = await this.modalController.create({
      component: ModalResponseStatusPage,
      componentProps: {
        typeIcon,
        message,
        path: '/app/tabs/vault-list'
      }
    });

    return await modalResponseStatus.present();
  }
}
