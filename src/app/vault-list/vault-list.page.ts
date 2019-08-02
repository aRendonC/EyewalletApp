import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AxiosService } from '../services/axios/axios.service';
import { LoadingService } from '../services/loading/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.page.html',
  styleUrls: ['./vault-list.page.scss'],
})

export class VaultListPage implements OnInit {
  public ctrlNavigation: number;
  public dataVaults: any;

  constructor(
    private authService: AuthService,
    private axiosService: AxiosService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.ctrlNavigation = 5;
    this.dataVaults = [];
  }

  async ngOnInit(): Promise<any> {
    this.dataVaults = await this.getListVaults();
    console.log(this.dataVaults);
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
}
