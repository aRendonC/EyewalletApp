import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalResponseStatusPage } from '../modal-response-status/modal-response-status.page';
import { ActivatedRoute } from '@angular/router';
import * as CONSTANTS from '../constanst';
import { TranslateService } from '@ngx-translate/core';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-vault-created',
  templateUrl: './vault-created.page.html',
  styleUrls: ['./vault-created.page.scss'],
})

export class VaultCreatedPage implements OnInit {
  public buttonDisabled: boolean;
  public dataVaultCreated: any;
  public USDtext: string;
  public shortNameCurrency: string;
  public nameCurrency: string;
  public amountCurrency: number;
  public amountUSD: number;
  public dataBody: AnyARecord;

  constructor(
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService
  ) {
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
    console.log('UNO: ', this.dataVaultCreated);
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
    this.showModalResponseStatus();
  }

  private async runVaultCreation(): Promise<any> {
    console.log('This is query...');
    const url: string = 'vault/create';

    // await this.loadingService.present({text: this.translateService.instant('VAULT.loading'), classColorText: 'loadingTextBlack'});
    // this.axiosService.post(url, body, this.authService)
    // .then(async response => {
    //   console.log(response);
    //   this.validateRunVaultCreation(response);
    //   await this.loadingService.dismiss();
    // })
    // .catch(async error => {
    //   console.log(error);
    //   this.errorResponseQueries();
    //   await this.loadingService.dismiss();
    // });
  }

  private async showModalResponseStatus(): Promise<any> {
    const modalResponseStatus = await this.modalController.create({
      component: ModalResponseStatusPage,
      componentProps: {
        typeIcon: 1,
        message: this.translateService.instant('VAULT_CREATED.modalMessageSuccessText'),
        path: '/app/tabs/vault'
      }
    });

    return await modalResponseStatus.present();
  }
}
