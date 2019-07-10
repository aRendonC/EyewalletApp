import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import * as CONSTANTS from '../constanst';
import {AesJsService} from "../services/aesjs/aes-js.service";
import {AuthService} from "../services/auth/auth.service";
import {AxiosService} from "../services/axios/axios.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
@Component({
  selector: 'app-verification-modal',
  templateUrl: './verification-modal.page.html',
  styleUrls: ['./verification-modal.page.scss'],
})
export class VerificationModalPage implements OnInit {
  public constants: any = CONSTANTS;
  ctrlContent: boolean = true;
  ctrlInput: boolean = false;
  ctrlVerification: boolean = false
  public phone: any = ''
  public code: any = ''
  constructor(
      private store: Storage,
      protected aesjs: AesJsService,
      protected auth: AuthService,
      private http: AxiosService,
      private modalCtrl: ModalController,
      private router: Router
  ) { }

  ngOnInit() {
  }
  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  async goToCreateProfile() {
    await this.router.navigate(['/app/tabs/create-profile']);
    await this.modalCtrl.dismiss();
  }

  async startVerification() {
    if (!this.ctrlInput) {
      this.phone = await this.store.get('profile')
      this.phone = this.aesjs.decrypt(this.phone)
      this.phone = this.phone.phone
      this.ctrlInput = true
    } else {

      console.log(this.phone)
    }
  }

  async sendCodeVerification() {
    let type = 'phone'
    let response = await this.http.post('user/sendCodeVerification', {type}, this.auth,)
    console.log(response)
    this.ctrlVerification = true
  }

  async verifyCode() {
    let body = {
      type: 'phone',
      code: this.code
    }
    let response = await this.http.post('user/validateCodePhone', body, this.auth)
    console.log(response)
    if(response.data) {
     await this.closeModal()
    } else {
      //poner el toast de error, muchas gracias.
    }
  }

}
