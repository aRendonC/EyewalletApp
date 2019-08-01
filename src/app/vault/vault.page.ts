import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local/data-local.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { TranslateService } from '@ngx-translate/core';
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { LoadingService } from '../services/loading/loading.service';
import * as CONSTANTS from '../constanst';

@Component({
  selector: 'app-vault',
  templateUrl: './vault.page.html',
  styleUrls: ['./vault.page.scss'],
})

export class VaultPage implements OnInit {
  public dataSelected: any;
  public buttonDisabled: boolean;
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
  public investmentPorcentageData: any;
  public investmentPorcentage: number;
  public currencyGain: any;
  public USDGain: any;
  public USD: any;
  public dataProfile: any;
  public priority: string;

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
    this.buttonDisabled = true;
    this.setDataSelectPockets();
    this.valueInvestment = 0;
    this.valueInvestmentUSD = 0;
    this.productCurrencyUsd = 0;
    this.enrollmentCurrency = 0;
    this.enrollmentUSD = 0;
    this.inputAmountDisabled = true;
    this.investmentPorcentageData = this.getinvestmentPercentageData();
    this.investmentPorcentage = this.investmentPorcentageData[0];
    this.currencyGain = 0;
    this.USDGain = 0;
    this.USD = CONSTANTS.VAULT.USD;
    this.priority = 'low'
  }

  public async ngOnInit(): Promise<any> {
    this.pockets = await this.getPockets();
    this.pocketDefaultSelected = this.pockets[0];
    this.dataSelected = this.pocketDefaultSelected.label;
    this.getPositionPocketSelected(this.pockets, this.dataSelected);
    this.validateInputAmountDisabled();
    this.dataProfile = await this.getDataProfile();
    console.log('PROFILE: ', this.dataProfile);
    console.log('POCKETS: ', this.pockets);
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
    const pocketsEncrypt = await this.dataLocal.getDataLocal(CONSTANTS.KEYS_DATA_LOCAL.POCKETS);
    return await this.aesjs.decrypt(pocketsEncrypt);
  }

  public handlerPocketSelected() {
    this.getPositionPocketSelected(this.pockets, this.dataSelected);
    this.resetAssingnValues();
    this.validateInputAmountDisabled();
  }

  public handlerValueInvestment(): void {
    this.validateAssignValues();
  }

  private validateAssignValues(): void {
    if (this.valueInvestment > 0 && this.valueInvestment<= this.pockets[this.positionPocketSelected].balance) {
      this.productCurrencyUsd = (this.valueInvestment * this.valueInvestmentUSD).toFixed(5);
      this.getFeeInvestment(this.valueInvestment);
      this.buttonDisabled = false;
    } else if (this.valueInvestment > this.pockets[this.positionPocketSelected].balance) {
      this.toastService.presentToast({text: this.translateService.instant('VAULT.higherValueErrorMessage')});
      this.resetAssingnValues();
    }
  }

  private async getCurrentCurrency(currency: string): Promise<any> {
    const url: string = 'currency/price-cripto';
    const dataBody: any = {
      shortName: currency
    };
    this.runQueryCurrency(url, dataBody);
  }

  private async runQueryCurrency(url: string, body: any): Promise<any> {
    await this.loadingService.present({text: this.translateService.instant('VAULT.loading'), classColorText: 'loadingTextBlack'});

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
      shortName: this.pockets[this.positionPocketSelected].currency.shortName,
      plan: this.investmentPorcentage
    };
    await this.runQueryFeeInvestment(url, dataBody);
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
      this.enrollmentUSD = parseFloat(dataResponse.data.feeUSD).toFixed(5);
      this.currencyGain = parseFloat(dataResponse.data.profitCripto).toFixed(5);
      this.USDGain = parseFloat(dataResponse.data.profitUsd).toFixed(5);
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

  private getinvestmentPercentageData(): any[] {
    return [3, 6, 12];
  }

  public handlerinvestmentPorcentageSelected(): void {
    this.getFeeInvestment(this.valueInvestment);
  }

  public createVault(): void {
    if (
      this.dataProfile.userId &&
      this.valueInvestment > 0 &&
      this.pockets[this.positionPocketSelected].address &&
      this.investmentPorcentage &&
      this.pockets[this.positionPocketSelected].currencyId &&
      this.priority
    ) {
      const dataBody:  any = {
        userId: this.dataProfile.userId,
        amount: this.valueInvestment,
        address: this.pockets[this.positionPocketSelected].address,
        plan: this.investmentPorcentage,
        currencyId: this.pockets[this.positionPocketSelected].currencyId,
        priority: this.priority,
        shortNameCurrency: this.pockets[this.positionPocketSelected].currency.shortName,
        nameCurrency: this.pockets[this.positionPocketSelected].currency.name,
        amountUSD: this.USDGain
      };
      // this.runVaultCreation(url, dataBody);
      this.router.navigate(['/app/tabs/vault-created', {dataVaultCreated: JSON.stringify(dataBody)}]);
      this.resetAssingnValues();
    }
  }

  private async runVaultCreation(url: string, body: any): Promise<any> {
    await this.loadingService.present({text: this.translateService.instant('VAULT.loading'), classColorText: 'loadingTextBlack'});
    this.axiosService.post(url, body, this.authService)
    .then(async response => {
      console.log(response);
      this.validateRunVaultCreation(response);
      await this.loadingService.dismiss();
    })
    .catch(async error => {
      console.log(error);
      this.errorResponseQueries();
      await this.loadingService.dismiss();
    });
  }

  private async validateRunVaultCreation(dataResponse: any): Promise<any> {
    if (dataResponse.status === 200) {
      this.setDataLocalPockets(dataResponse.wallets);
      this.router.navigate(['/app/tabs/dashboard']);
    } else {
      this.errorResponseQueries();
    }
  }

  private async setDataLocalPockets(pockets: any[]): Promise<any> {
    console.log('SET_POCKETS: ', pockets);
    const pocketsEncrypt: any = this.aesjs.encrypt(pockets);
    console.log('SET_POCKETS_ENCRYPT: ', pocketsEncrypt);
    this.dataLocal.setDataLocal(CONSTANTS.KEYS_DATA_LOCAL.POCKETS, pocketsEncrypt);
    this.resetAssingnValues();
    this.pockets = await this.getPockets();
  }

  private async getDataProfile(): Promise<any> {
    const dataProfile = await this.dataLocal.getDataLocal(CONSTANTS.KEYS_DATA_LOCAL.PROFILE);
    return await this.aesjs.decrypt(dataProfile);
  }

  private resetAssingnValues(): void {
    this.valueInvestment = 0;
    this.productCurrencyUsd = 0;
    this.enrollmentCurrency = 0;
    this.enrollmentUSD = 0;
    this.currencyGain = 0;
    this.USDGain = 0;
    this.buttonDisabled = true;
  }
}
