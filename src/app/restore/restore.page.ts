// Dependecies.
import { Component, OnInit } from '@angular/core';
import validator from 'validator';

// Services.
import { AxiosService } from '../services/axios/axios.service';
import { DeviceService } from '../services/device/device.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { Router } from '@angular/router';
import { DataLocalService } from '../services/data-local/data-local.service';

// Constants.
import * as CONSTANTS from '../constanst';
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})

export class RestorePage implements OnInit {
  public dataRestorePassword = {
    pin: '',
    newPassword: '',
    repeatNewPassword: '',
    blocked: false
  };

  private newPasswordLength: object = {
    min: 6,
    max: undefined
  }

  public buttonDisabled: boolean = true;
  public pinOk: boolean = false;
  public newPasswordOk: boolean = false;
  public repearNewPasswordOk: boolean = false;
  public dataDeviceId: any;
  private blockingCounter: number = 0;
  public path: string = 'login';

  constructor(
    private axiosServices: AxiosService,
    private deviceService: DeviceService,
    private aesJs: AesJsService,
    private router: Router,
    private toastController: ToastService,
    private dataLocal: DataLocalService,
    private loadingCtrl: LoadingService
  ) { }

  ngOnInit() {
    this.deviceService.getDataDevice()
    .then(response => {
      this.dataDeviceId = response.uuid;
    });
  }

  public validatePin(event: string): void {
    const pinLength: object = {
      min: 6,
      max: 6
    }

    if (
      !validator.isEmpty(event) &&
      validator.isNumeric(event) &&
      validator.isLength(event, pinLength)
    ) {
      this.dataRestorePassword.pin = event;
      this.pinOk = true;
      this.enableButton();
    } else {
      this.dataRestorePassword.pin = event;
      this.pinOk = false;
      this.enableButton();
    }
  }

  public validateNewPassword(event: string): void {
    if (
      !validator.isEmpty(event) &&
      validator.isLength(event, this.newPasswordLength) &&
      validator.isAlphanumeric(event) &&
      !validator.isNumeric(event) &&
      !validator.isAlpha(event)
    ) {
      this.dataRestorePassword.newPassword = event;
      this.newPasswordOk = true;
      this.enableButton();
    } else {
      this.dataRestorePassword.newPassword = event;
      this.newPasswordOk = false;
      this.enableButton();
    }
  }

  public validateRepeatNewPassword(event: string): void {
    if (
      !validator.isEmpty(event) &&
      validator.isLength(event, this.newPasswordLength) &&
      validator.isAlphanumeric(event) &&
      !validator.isNumeric(event) &&
      !validator.isAlpha(event) &&
      event === this.dataRestorePassword.newPassword
    ) {
      this.repearNewPasswordOk = true;
      this.enableButton();
    } else {
      this.repearNewPasswordOk = false;
      this.enableButton();
    }
  }

  private enableButton(): void {
    if (this.pinOk && this.newPasswordOk) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  private encryptPin(pin): any {
    return this.aesJs.encryptNoJson(pin);
  }

  // private async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: CONSTANTS.RESTORE_PASSWORDO.WALLET_BLOCKED,
  //     duration: 3000
  //   });
  //
  //   toast.present();
  // }

  private blockWallet(blockingCounter: number): void {
    const keyDataLocal: string = 'storageBlockingData';

    this.dataLocal.getDataLocal(keyDataLocal)
    .then(response => {
      this.validateStorageBlockingData(response, blockingCounter, keyDataLocal);
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

  public async restorePassword() {
    await this.loadingCtrl.present({})
    const path: string = 'auth/recovery';

    const dataBody: object = {
      deviceId: this.dataDeviceId,
      pin: this.encryptPin(this.dataRestorePassword.pin),
      password: this.dataRestorePassword.newPassword,
      blocked: this.dataRestorePassword.blocked
    };

    this.axiosServices.post(path, dataBody)
        .then(async response => {
          if (response.status === 200) {
            this.blockingCounter = 0;
            this.dataRestorePassword.blocked = false;
            await this.router.navigate(['']);
            await this.loadingCtrl.dismiss()
          } else if (response.status === 500) {
            this.blockingCounter++;
            this.blockWallet(this.blockingCounter);
            await this.loadingCtrl.dismiss()
          }
        });
  }
}
