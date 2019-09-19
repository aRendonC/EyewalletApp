import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../services/data-local/data-local.service';
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
  public nameTypeSliding: any;
  public buttonLeftSliding: boolean;
  public ctrlNavigation: number;
  public loadingValuesFee: boolean;
  public dataSelected: any;
  public buttonDisabled: boolean;
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
  public listVaultLength: boolean;

  public constructor(
    private dataLocal: DataLocalService,
    private translateService: TranslateService,
    private axiosService: AxiosService,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {
    this.nameTypeSliding = CONSTANTS.NAMES_SLIDING.VAULT_SLIDING;
    this.buttonLeftSliding = false;
    this.ctrlNavigation = 6;
    this.loadingValuesFee = false;
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
    this.priority = 'low';
    this.listVaultLength = false;
  }

  public async ngOnInit(): Promise<any> {
    this.pockets = await this.getPockets();
    this.pocketDefaultSelected = this.pockets[0];
    this.dataSelected = this.pocketDefaultSelected.label;
    this.getPositionPocketSelected(this.pockets, this.dataSelected);
    this.validateInputAmountDisabled();
    this.dataProfile = await this.getDataProfile();
  }

  public async ionViewDidEnter(): Promise<any> {
    this.pockets = await this.getPockets();
    await this.getCurrentCurrency(this.pocketDefaultSelected.currency.shortName);
    this.resetAssingnValues();
    this.validateVaultsCreated();
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
    return await this.dataLocal.getDataLocal('pockets');
  }

  public handlerPocketSelected() {
    this.getPositionPocketSelected(this.pockets, this.dataSelected);
    this.resetAssingnValues();
    this.validateInputAmountDisabled();
  }

  public handlerValueInvestment(): void {
    if (this.valueInvestment !== 0) {
      this.validateAssignValues();
    } else {
      this.resetAssingnValues();
    }
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
    await this.loadingService.present({text: this.translateService.instant('VAULT.loading'), cssClass: 'textLoadingBlack'});

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
    if (this.valueInvestment !== 0) await this.runQueryFeeInvestment(url, dataBody);
  }

  private async runQueryFeeInvestment(url: string, body: any): Promise<any> {
    this.loadingValuesFee = true;
    this.axiosService.post(url, body, this.authService)
    .then(async response => {
      this.validateQueryFeeInvestment(response);
      this.loadingValuesFee = false;
    })
    .catch(async error => {
      this.loadingValuesFee = false;
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
      this.router.navigate(['/app/tabs/vault-created', {dataVaultCreated: JSON.stringify(dataBody)}]);
      this.resetAssingnValues();
    }
  }

  private async getDataProfile(): Promise<any> {
    return await this.dataLocal.getDataLocal('profile');
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

  private async validateVaultsCreated(): Promise<any> {
    this.axiosService.get('vault/index', this.authService)
    .then(async (response: any) => {
      if (response.vault.length > 0) {
        this.listVaultLength = true;
        this.buttonLeftSliding = true;
      } else {
        this.listVaultLength = false;
        this.buttonLeftSliding = false;
      }
    })
    .catch(async error => {
      console.error(error);
    });
  }
}
