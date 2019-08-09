import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AxiosService } from '../services/axios/axios.service';
import { LoadingService } from '../services/loading/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../services/toast/toast.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { VaultList } from '../interfaces/index';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.page.html',
  styleUrls: ['./vault-list.page.scss'],
})

export class VaultListPage implements OnInit {
  public ctrlNavigation: number;
  public dataVaults: VaultList;
  public dataSelected: string;
  public positionDataSelected: number;
  public criptoTotal: number;
  public criptoUSDTotal: number;

  public constructor(
    private authService: AuthService,
    private axiosService: AxiosService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {
    this.ctrlNavigation = 5;
    this.dataVaults = {};
    this.dataSelected = '';
    this.positionDataSelected = 0;
    this.criptoTotal = 0;
    this.criptoUSDTotal = 0;
  }

  public async ngOnInit(): Promise<any> { }

  public async ionViewDidEnter(): Promise<any> {
    this.dataVaults = await this.getListVaults();
    this.validateValueCriptos(this.dataVaults, this.positionDataSelected);
    // this.dataSelected = this.dataVaults.data[this.positionDataSelected].shortName;
    this.validateDataVaults(this.dataVaults.data);
  }

  private validateValueCriptos(dataInfo: VaultList, position: number): void {
    if (dataInfo.data.length > 0) {
      this.criptoTotal = dataInfo.data[position].amountCriptoTotal;
      this.criptoUSDTotal = dataInfo.data[position].amountCriptoUsdTotal;
    } else {
      this.criptoTotal = 0;
      this.criptoUSDTotal = 0;
    }
  }

  private validateDataVaults(dataArray: any[]): void {
    if (dataArray.length > 0) {
      this.dataSelected = dataArray[this.positionDataSelected].shortName;
      console.log('UNO: ', this.dataSelected);
    } else {
      this.dataSelected = '';
      console.log('DOS: ', this.dataSelected);
    }
  }

  private async getListVaults(): Promise<any> {
    await this.loadingService.present({text: this.translateService.instant('VAULT_LIST.loadingText'), cssClass: 'textLoadingBlack'});
    return this.axiosService.get('vault/index', this.authService)
    .then(async response => {
      await this.loadingService.dismiss();
      return response;
    })
    .catch(async error => {
      console.error(error);
      await this.loadingService.dismiss();
      this.validateResponseFetchErrorD();
    });
  }

  public handlerCurrencySelected(): void {
    this.getPositionDataSelected(this.dataSelected);
    this.validateValueCriptos(this.dataVaults, this.positionDataSelected);
  }

  private getPositionDataSelected(dataSelected: string): void {
    for (let i = 0; i < this.dataVaults.data.length; i++) {
      if (dataSelected === this.dataVaults.data[i].shortName) {
        this.positionDataSelected = i;
      }
    }
  }

  public async deleteVault(dataVault: any, item: any): Promise<any> {
    this.presentActionSheet(dataVault);
    item.close();
  }

  private async presentActionSheet(dataVault: any): Promise<any> {
    const actionSheet = await this.actionSheetController.create({
      backdropDismiss: false,
      header: this.translateService.instant('VAULT_LIST.titleSheetText'),
      mode: 'md',
      buttons: [
        {
          text: this.translateService.instant('VAULT_LIST.removeText'),
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.runQueryDeleteVault(dataVault);
          }
        },
        {
          text: this.translateService.instant('VAULT_LIST.cancelText'),
          icon: 'close',
          role: 'cancel',
        }
      ]
    });
    await actionSheet.present();
  }

  private async runQueryDeleteVault(dataVault: any): Promise<any> {
    await this.loadingService.present({text: this.translateService.instant('VAULT_LIST.loadingText'), cssClass: 'textLoadingBlack'});
    const url: string = 'vault/cancel';
    const dataBody: any = {
      userId: dataVault.user_id,
      vaultId: dataVault.vaultId,
      description: this.translateService.instant('VAULT_LIST.descriptionRequestDeleteVault'),
    };

    this.axiosService.post(url, dataBody, this.authService)
    .then(async response => {
      this.validateResponseRunQueryDeleteVault(response);
      await this.loadingService.dismiss();
    })
    .catch(async error => {
      console.error(error);
      this.validateResponseFetchError();
      await this.loadingService.dismiss();
    })
  }

  private async validateResponseRunQueryDeleteVault(dataResponse: any): Promise<any> {
    if (dataResponse.status === 200) {
      this.toastService.presentToast({text: this.translateService.instant('VAULT_LIST.responseRequestVaultDelete')});
      this.router.navigate(['/app/tabs/dashboard']);
    } else {
      this.validateResponseFetchError();
    }
  }

  private validateResponseFetchErrorD(): void {
    this.toastService.presentToast({text: this.translateService.instant('VAULT_LIST.toastErrorText')});
    this.router.navigate(['/app/tabs/dashboard']);
  }

  private validateResponseFetchError(): void {
    this.toastService.presentToast({text: this.translateService.instant('VAULT_LIST.toastErrorText')});
    this.router.navigate(['/app/tabs/vault-list']);
  }
}
