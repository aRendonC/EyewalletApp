
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AxiosService } from '../services/axios/axios.service';
import { DeviceService } from '../services/device/device.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { DataLocalService } from '../services/data-local/data-local.service';
import {LoadingService} from "../services/loading/loading.service";

import * as CONSTANTS from '../constanst';

import {ToastService} from "../services/toast/toast.service";


import * as utils from '../../assets/utils';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})

export class RestorePage implements OnInit {
  public dataRestorePassword = {
    pin: '',
    email: '',
    newPassword: '',
    repeatNewPassword: '',
    blocked: false
  };

  public buttonDisabled: boolean = true;
  public pinOk: boolean = false;
  public newPasswordOk: boolean = false;
  public newPasswordError: boolean;
  public repeatNewPasswordOk: boolean = false;
  public emailOk: boolean = false;
  public repeatNewPasswordError: boolean;
  public dataDeviceId: any;
  private blockingCounter: number = 0;
  public path: string = 'login';
  public ctrlCssBlur = false;

  constructor(
    private axiosServices: AxiosService,
    private deviceService: DeviceService,
    private aesJs: AesJsService,
    private router: Router,
    private toastController: ToastService,
    private dataLocal: DataLocalService,
    private loadingCtrl: LoadingService,
    private translateService: TranslateService,
  ) { }

  public async ngOnInit(): Promise<any> {
    this.dataDeviceId = await this.getDataDeviceId();
  }

  public validatePin(event: any): void {
    if (utils.validatePin(event)) {
      this.dataRestorePassword.pin = event;
      this.pinOk = true;
      this.enableButton();
    } else {
      this.dataRestorePassword.pin = event;
      this.pinOk = false;
      this.enableButton();
    }
  }

  public validateEmail(event): void {
    if (utils.validateEmail(event)) {
      this.dataRestorePassword.email = event;
      this.emailOk = true;
      this.enableButton();
    } else {
      this.dataRestorePassword.email = event;
      this.emailOk = false;
      this.enableButton();
    }
  }

  public validateNewPassword(event: string): void {
    if (utils.validatePassword(event)) {
      this.dataRestorePassword.newPassword = event;
      this.newPasswordOk = true;
      this.newPasswordError = false;
      this.enableButton();
    } else {
      this.dataRestorePassword.newPassword = event;
      this.newPasswordOk = false;
      this.newPasswordError = true;
      this.enableButton();
    }
  }

  public validateRepeatNewPassword(event: string): void {
    if (utils.validatePassword(event) && event === this.dataRestorePassword.newPassword) {
      this.repeatNewPasswordOk = true;
      this.repeatNewPasswordError = false;
      this.enableButton();
    } else {
      this.repeatNewPasswordOk = false;
      this.repeatNewPasswordError = true;
      this.enableButton();
    }
  }

  private enableButton(): void {
    this.buttonDisabled = !(this.newPasswordOk && this.repeatNewPasswordOk);
  }

  private encryptPin(pin): any {
    return this.aesJs.encryptNoJson(pin);
  }

  public async restorePassword(): Promise<any> {
    await this.loadingCtrl.present({text: this.translateService.instant('RESTORE.ChangingPassword')});
    this.ctrlCssBlur = true;
    const path: string = 'auth/recovery';

    const dataBody: object = {
      email: this.dataRestorePassword.email,
      pin: this.encryptPin(this.dataRestorePassword.pin),
      password: this.dataRestorePassword.newPassword,
      blocked: this.dataRestorePassword.blocked
    };

    console.log(dataBody);
    this.axiosServices.post(path, dataBody)
    .then(async response => {
      await this.validateResponseChangePassword(response);
      await this.loadingCtrl.dismiss();
      this.ctrlCssBlur = false;
    })
    .catch(async error => {
      await this.loadingCtrl.dismiss();
      this.ctrlCssBlur = false;
      this.toastController.presentToast({text: 'Errores de conexion'});
    });
  }

  private async validateResponseChangePassword(data: any): Promise<any> {
    if (data.status === 200) {
      this.blockingCounter = 0;
      this.dataRestorePassword.blocked = false;
      this.toastController.presentToast({text: this.translateService.instant('RESTORE.UpdatePasswordOk')});
      await this.router.navigate(['']);
    } else if (data.status === 500) {
      this.blockingCounter++;
      await this.blockWallet(this.blockingCounter);
      this.toastController.presentToast({text: this.translateService.instant('RESTORE.DataInputError')});
    } else {
      this.toastController.presentToast({text: this.translateService.instant('RESTORE.DataInputError')});
    }
  }

  private async blockWallet(blockingCounter: number): Promise<any> {
    const keyDataLocal: string = 'storageBlockingData';

    this.dataLocal.getDataLocal(keyDataLocal)
    .then(async response => {
      await this.validateStorageBlockingData(response, blockingCounter, keyDataLocal);
    });
  }

  private async validateStorageBlockingData(response: any, blockingCounter: any, keyDataLocal: any) {
    if (response === undefined || response === null || blockingCounter <= 2) {
      this.dataLocal.setDataLocal(keyDataLocal, blockingCounter);
      if (blockingCounter === 2) this.dataRestorePassword.blocked = true;
    } else if (blockingCounter === 3) {
      this.blockingCounter = 0;
      this.dataLocal.setDataLocal(keyDataLocal, this.blockingCounter);
      await this.toastController.presentToast({text: CONSTANTS.RESTORE_PASSWORDO.WALLET_BLOCKED});
      this.router.navigate(['']);
    }
  }

  private async getDataDeviceId(): Promise<any> {
    return this.deviceService.getDataDevice()
    .then(async (response: any) => {
      return await response.uuid;
    });
  }
}
