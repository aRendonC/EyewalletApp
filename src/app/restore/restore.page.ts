// Dependecies.
import { Component, OnInit } from '@angular/core';
import validator from 'validator';

// Services.
import { AxiosService } from '../services/axios/axios.service';
import { DeviceService } from '../services/device/device.service';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})

export class RestorePage implements OnInit {
  public dataRestorePassword = {
    pin: '',
    newPassword: '',
    repeatNewPassword: ''
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

  constructor(
    private axiosServices: AxiosService,
    private deviceService: DeviceService,
    private aesJs: AesJsService,
    private router: Router
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
    return this.aesJs.encrypt(pin);
  }

  public restorePassword(): void {
    const path: string = 'auth/recovery';

    const dataBody: object = {
      deviceId: this.dataDeviceId,
      pin: this.encryptPin(this.dataRestorePassword.pin),
      password: this.dataRestorePassword.newPassword
    };

    this.axiosServices.post(path, dataBody)
    .then(response => {
      if (response.status === 200) {
        this.router.navigate(['']);
      }
    })
  }
}
