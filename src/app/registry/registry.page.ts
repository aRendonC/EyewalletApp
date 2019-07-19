// Dependencies.
import { Component, OnInit } from '@angular/core';
import validator from 'validator';

// Navigations.
import { ToastController } from '@ionic/angular';
import { Router} from '@angular/router';
import {Storage} from '@ionic/storage';

// Services.
import { AxiosService } from '../services/axios/axios.service';
import {DeviceService} from "../services/device/device.service";
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";

// Constants.
import * as CONSTANTS from '../constanst';

// Utils.
import * as utils from '../../assets/utils';
import { TouchLoginService } from '../services/fingerprint/touch-login.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})

export class RegistryPage implements OnInit {
  public constants: any = CONSTANTS;
  public dataRegistry = {
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  public confirmPasswordOk: boolean = false;
  public confirmPasswordError: boolean = false;
  public passwordOk: boolean = false;
  public passwordError: boolean = false;
  public phoneOk: boolean = false;
  public emailOk: boolean = false;
  public disableButton: boolean = true;
  public classButton: string = 'button-disable';
  public path: string = '';

  constructor(
    private register: AxiosService,
    private router: Router,
    private store: Storage,
    private device: DeviceService,
    private loadingCtrl: LoadingService,
    private toastCtrl: ToastService,
    private touchCtrl: TouchLoginService
  ) { }

  ngOnInit() { 
    this.touchCtrl.isTouch = false
  }

  public validateEmail(event): void {
    if (utils.validateEmail(event)) {
      this.dataRegistry.email = event;
      this.emailOk = true;
      this.enableButton();
    } else {
      this.dataRegistry.email = event;
      this.emailOk = false;
      this.enableButton();
    }
  }

  public validatePhone(event): void {
    if (utils.validatePhone(event)) {
      this.dataRegistry.phone = event;
      this.phoneOk = true;
      this.enableButton();
    } else {
      this.dataRegistry.phone = event;
      this.phoneOk = false;
      this.enableButton();
    }
  }

  public validatePassword(event): void {
    if (utils.validatePassword(event)) {
      this.dataRegistry.password = event;
      this.passwordOk = true;
      this.enableButton();
      this.passwordError = false;
    } else {
      this.dataRegistry.password = event;
      this.passwordOk = false;
      this.enableButton();
      this.passwordError = true;
    }
  }

  public validateConfirmPassword(event): void {
    if (utils.validatePassword(event)) {
      this.dataRegistry.confirmPassword = event;

      if (this.dataRegistry.password === event) {
        this.confirmPasswordOk = true;
        this.confirmPasswordError = false;
      } else {
        this.confirmPasswordOk = false;
        this.confirmPasswordError = true;
      }
      this.enableButton();
    } else {
      this.dataRegistry.confirmPassword = event;
      this.confirmPasswordOk = false;
      this.enableButton();
      this.confirmPasswordError = true;
    }
  }

  public enableButton(): void {
    if (
      this.emailOk &&
      this.phoneOk &&
      this.passwordOk &&
      this.confirmPasswordOk &&
      (this.dataRegistry.password === this.dataRegistry.confirmPassword)
    ) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }

    this.classButton = this.disableButton ? 'button-disable' : 'button-enable';
  }

  public async sendDataRegistry(): Promise<any> {
    await this.loadingCtrl.present({})
    const device = await this.device.getDataDevice();
    const urlRegistry: string = 'auth/register';
    const dataBody: object = {
      email: this.dataRegistry.email,
      phone: this.dataRegistry.phone,
      password: this.dataRegistry.password,
      deviceId: device.uuid
    };

    this.register.post(urlRegistry, dataBody)
    .then(async response => {
      if (response.status === 200) {
        await this.store.set('user', response.data);
        this.touchCtrl.isTouch = true;
        await this.router.navigate(['/registry-pin'], {
        queryParams: {
        user: JSON.stringify(response.data),
        password: JSON.stringify(this.dataRegistry.password)
        },
        queryParamsHandling: 'merge'
        });
        await this.loadingCtrl.dismiss()
      } else {
        await this.toastCtrl.presentToast({text: response.error.msg})
        await this.loadingCtrl.dismiss()
      }
    });
  }

  // async presentToast(text) {
  //   const toast = await this.toastCtrl.create({
  //     message: text,
  //     duration: 2000
  //   });
  //    await toast.present();
  // }
}
