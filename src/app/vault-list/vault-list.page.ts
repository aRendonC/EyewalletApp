import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AxiosService } from '../services/axios/axios.service';
import { LoadingService } from '../services/loading/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../services/toast/toast.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.page.html',
  styleUrls: ['./vault-list.page.scss'],
})

export class VaultListPage implements OnInit {
  public ctrlNavigation: number;
  public dataVaults: any;
  public dataSelected: string;

  constructor(
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
  }

  async ngOnInit(): Promise<any> {
    this.dataVaults = await this.getListVaults();
    this.dataSelected = this.dataVaults.data[0].shortName;
    console.log('UNO: ', this.dataVaults);
  }

  private async getListVaults(): Promise<any> {
    await this.loadingService.present({text: this.translateService.instant('VAULT_LIST.loadingText'), classColorText: 'loadingTextBlack'});
    return this.axiosService.get('vault/index', this.authService)
    .then(async response => {
      await this.loadingService.dismiss();
      return response;
    })
    .catch(async error => {
      console.error(error);
      await this.loadingService.dismiss();
      this.validateResponseFetchError();
    });
  }

  private validateResponseFetchError(): void {
    this.toastService.presentToast({text: this.translateService.instant('VAULT_LIST.toastErrorText')});
    this.router.navigate(['/app/tabs/vault-list']);
  }

  public async deleteVault(dataVault: any): Promise<any> {
    this.presentActionSheet(dataVault);
  }

  private async presentActionSheet(dataVault: any): Promise<any> {
    const actionSheet = await this.actionSheetController.create({
      backdropDismiss: false,
      header: this.translateService.instant('VAULT_LIST.titleSheetText'),
      mode: 'md',
      buttons: [
        {
          text: this.translateService.instant('VAULT_LIST.deleteText'),
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
    console.log('Data vault: ', dataVault);
  }

  public handlerCurrencySelected(): void {
    console.log(this.dataSelected);
  }
}
