// Dependencies.
import { Component, OnInit } from '@angular/core';
import validator from 'validator';

// Constants.
import * as CONSTANTS from '../constanst';
import { AxiosService } from '../services/axios/axios.service';

// Navigations.
import {NavigationExtras, Router} from '@angular/router';

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
    password: ''
  }
  public passwordOk: boolean = false;
  public passwordError: boolean = false;
  public phoneOk: boolean = false;
  public emailOk: boolean = false;
  public disableButton: boolean = true;
  public classButton: string = 'button-disable';

  constructor(
    private register: AxiosService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  public validateEmail(event): void {
    if (!validator.isEmpty(event) && validator.isEmail(event)) {
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
    const locale = [
      'ar-AE', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-SA', 'ar-SY', 'ar-TN', 'be-BY', 'bg-BG', 'bn-BD', 'cs-CZ', 'de-DE', 'da-DK', 'el-GR', 'en-AU', 'en-CA', 'en-GB', 'en-GH', 'en-HK', 'en-IE', 'en-IN', 'en-KE', 'en-MU', 'en-NG', 'en-NZ', 'en-RW', 'en-SG', 'en-UG', 'en-US', 'en-TZ', 'en-ZA', 'en-ZM', 'en-PK', 'es-ES', 'es-MX', 'es-PY', 'es-UY', 'et-EE', 'fa-IR', 'fi-FI', 'fr-FR', 'he-IL', 'hu-HU', 'id-ID', 'it-IT', 'ja-JP', 'kk-KZ', 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'nn-NO', 'pl-PL', 'pt-PT', 'pt-BR', 'ro-RO', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sv-SE', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-TW'
    ];

    if (!validator.isEmpty(event) && validator.isMobilePhone(event, locale)) {
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
    const passwordLength = {
      min: 6,
      max: undefined
    }

    if (!validator.isEmpty(event) &&
      validator.isLength(event, passwordLength) &&
      validator.isAlphanumeric(event) &&
      !validator.isNumeric(event) &&
      !validator.isAlpha(event)
    ) {
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

  public enableButton(): void {
    if (this.emailOk && this.phoneOk && this.passwordOk) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }

    this.classButton = this.disableButton ? 'button-disable' : 'button-enable';
  }

  public sendDataRegistry() {
    const urlRegistry: string = 'auth/register';
    const dataBody: object = {
      email: this.dataRegistry.email,
	    phone: this.dataRegistry.phone,
	    password: this.dataRegistry.password
    };

    this.register.post(urlRegistry, dataBody)
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            user: JSON.stringify(response.data),
          }
        }
        this.router.navigate(['registry-pin'], navigationExtras);
      }
    });

  }
}
