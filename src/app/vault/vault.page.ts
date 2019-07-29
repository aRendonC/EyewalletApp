import { Component, OnInit } from '@angular/core';

import { DataLocalService } from '../services/data-local/data-local.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { TranslateService } from '@ngx-translate/core';

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

  public constructor(
    private dataLocal: DataLocalService,
    private aesjs: AesJsService,
    private translateService: TranslateService
  ) {
    this.setDataSelectPockets();
  }

  private setDataSelectPockets(): void {
    this.dataPockets = {
      placeholderSelectPocket: this.translateService.instant('VAULT.placeholderPockets'),
      buttonOkSelect: this.translateService.instant('VAULT.buttonOkSelect'),
      buttonCancelSelect: this.translateService.instant('VAULT.buttonCancelSelect')
    };
  }

  public async ngOnInit(): Promise<any> {
    this.pockets = await this.getPockets();
    this.dataSelected = this.pockets[0].label;
    this.getPositionPocketSelected(this.pockets, this.dataSelected);

    console.log('UNO: ', this.pockets);
    console.log('DOS: ', this.dataSelected);
  }

  private getPositionPocketSelected(pockets: any[], pocketSelected: string): void {
    for (const i = 0; i < pockets.length; i++) {
      if (pockets[i].label === pocketSelected) {
        this.positionPocketSelected = i;
      }
    }
  }

  private async getPockets(): Promise<any> {
    const pocketsEncrypt = await this.dataLocal.getDataLocal('pockets');
    return await this.aesjs.decrypt(pocketsEncrypt);
  }

  public async ionViewDidEnter(): Promise<any> {
    const elementDashboard: any = document.getElementsByTagName('app-vault');
    elementDashboard[0].classList.add("margins-dashboard");
  }

  public handlerPocketSelected() {
    console.log('CUATRO: ', this.dataSelected);
    this.getPositionPocketSelected(this.pockets, this.dataSelected);
  }

  public continueCreateVault(): void { }
}
