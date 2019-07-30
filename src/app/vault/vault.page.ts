import { Component, OnInit } from '@angular/core';

import { DataLocalService } from '../services/data-local/data-local.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { TranslateService } from '@ngx-translate/core';
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.page.html',
  styleUrls: ['./vault.page.scss'],
})

export class VaultPage implements OnInit {
  public dataSelected: any;
  public buttonDisabled: boolean = true;
  public ctrlNavigation: number = 5;
  public pockets: any;
  public dataPockets: any;
  public positionPocketSelected: number;
  public valueInvestment: number;
  public valueInvestmentUSD: number;
  public productCurrencyUsd: any;
  public pocketDefaultSelected: any;
  public enrollmentCurrency: any;
  public enrollmentUSD: any;
  public inputAmountDisabled: boolean;

  public constructor(
    private dataLocal: DataLocalService,
    private aesjs: AesJsService,
    private translateService: TranslateService,
    private axiosService: AxiosService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    this.setDataSelectPockets();
    this.valueInvestment = 0;
    this.valueInvestmentUSD = 0;
    this.productCurrencyUsd = 0;
    this.enrollmentCurrency = 0;
    this.enrollmentUSD = 0;
    this.inputAmountDisabled = true;
  }

  public async ngOnInit(): Promise<any> {
    this.pockets = await this.getPockets();
    this.pocketDefaultSelected = this.pockets[0];
    this.dataSelected = this.pocketDefaultSelected.label;
    this.getPositionPocketSelected(this.pockets, this.dataSelected);
    this.validateInputAmountDisabled();
  }

  public async ionViewDidEnter(): Promise<any> {
    const elementDashboard: any = document.getElementsByTagName('app-vault');
    elementDashboard[0].classList.add("margins-dashboard");
    await this.getCurrentCurrency(this.pocketDefaultSelected.currency.shortName);
  }

  private setDataSelectPockets(): void {
    this.dataPockets = {
      placeholderSelectPocket: this.translateService.instant('VAULT.placeholderPockets'),
      buttonOkSelect: this.translateService.instant('VAULT.buttonOkSelect'),
      buttonCancelSelect: this.translateService.instant('VAULT.buttonCancelSelect')
    };
  }

  private getPositionPocketSelected(pockets: any[], pocketSelected: string): void {
    for (let i = 0; i < pockets.length; i++) {
      if (pockets[i].label === pocketSelected) {
        this.positionPocketSelected = i;
      }
    }
  }

  private async getPockets(): Promise<any> {
    const pocketsEncrypt = await this.dataLocal.getDataLocal('pockets');
    return await this.aesjs.decrypt(pocketsEncrypt);
  }

  public handlerPocketSelected() {
    this.getPositionPocketSelected(this.pockets, this.dataSelected);
    this.valueInvestment = 0;
    this.validateInputAmountDisabled();
  }

  public handlerValueInvestment(): void {
    this.productCurrencyUsd = (this.valueInvestment * this.valueInvestmentUSD).toFixed(5);
    this.getFeeInvestment(this.valueInvestment);
  }

  private async getCurrentCurrency(currency: string): Promise<any> {
    const url: string = 'currency/price-cripto';
    const dataBody: any = {
      shortName: currency
    };
    this.runQueryCurrency(url, dataBody);
  }

  private async runQueryCurrency(url: string, body: any): Promise<any> {
    await this.loadingService.present({text: this.translateService.instant('VAULT.loading')});

    this.axiosService.post(url, body, this.authService)
    .then(async response => {
      this.validateGetCurrentCurrency(response);
      await this.loadingService.dismiss();
    })
    .catch(async error => {
      console.error(error);
      this.errorResponseQueries();
      await this.loadingService.dismiss();
    });
  }

  private validateGetCurrentCurrency(dataResponse: any): void {
    if (dataResponse.status === 200) {
      this.valueInvestmentUSD = dataResponse.data.USD;
    } else {
      this.errorResponseQueries();
    }
  }

  private async getFeeInvestment(amountInvestment: number): Promise<any> {
    const url: string = 'vault/fee';
    const dataBody: any = {
      amount: amountInvestment,
	    currencyId: this.pockets[this.positionPocketSelected].currencyId,
	    shortName: this.pockets[this.positionPocketSelected].currency.shortName
    };
    if (amountInvestment > 0) {
      await this.runQueryFeeInvestment(url, dataBody);
    }
  }

  private async runQueryFeeInvestment(url: string, body: any): Promise<any> {
    this.axiosService.post(url, body, this.authService)
    .then(async response => {
      this.validateQueryFeeInvestment(response);
    })
    .catch(async error => {
      console.error(error);
      this.errorResponseQueries();
    });
  }

  private validateQueryFeeInvestment(dataResponse: any): void {
    if (dataResponse.status === 200) {
      this.enrollmentCurrency = parseFloat(dataResponse.data.estimated_network_fee).toFixed(5);
      this.enrollmentUSD = parseFloat(dataResponse.data.feeUSD).toFixed(5)
    } else {
      this.errorResponseQueries();
    }
  }

  private errorResponseQueries(): void {
    this.toastService.presentToast({text: this.translateService.instant('VAULT.messageErrorLoadPage')});
    this.router.navigate(['/app/tabs/dashboard']);
  }

  private validateInputAmountDisabled(): void {
    this.inputAmountDisabled = this.pockets[this.positionPocketSelected].balance > 0 ? false : true;
  }

  public messageWithoutFunds(): void {
    if (this.pockets[this.positionPocketSelected].balance <= 0) {
      this.toastService.presentToast({text: this.translateService.instant('VAULT.messageWithoutFunds')});
    }
  }

  public continueCreateVault(): void { }
}
