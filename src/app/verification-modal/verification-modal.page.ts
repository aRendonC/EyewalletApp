import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";
import * as CONSTANTS from '../constanst';
import {AesJsService} from "../services/aesjs/aes-js.service";
import {AuthService} from "../services/auth/auth.service";
import {AxiosService} from "../services/axios/axios.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ToastService} from "../services/toast/toast.service";
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
  public profile: any = ''
  public code: any = ''
  constructor(
      private store: Storage,
      protected aesjs: AesJsService,
      protected auth: AuthService,
      private http: AxiosService,
      private modalCtrl: ModalController,
      private router: Router,
      private toastCtrl: ToastService
  ) { }

  ngOnInit() {
  }
  async closeModal(data) {
    await this.modalCtrl.dismiss(data);
  }
  async goToCreateProfile() {
    await this.router.navigate(['/create-profile']);
    await this.modalCtrl.dismiss();
  }

  async startVerification() {
    if (!this.ctrlInput) {
      this.profile = await this.store.get('profile')
      this.profile = this.aesjs.decrypt(this.profile)
      this.ctrlInput = true;
    } else {

    }
  }

  async sendCodeVerification() {
    const type = 'phone';
    const response = await this.http.post('user/sendCodeVerification', {type}, this.auth,)
    this.ctrlVerification = true
  }

  async verifyCode() {
    let body = {
      type: 'phone',
      code: this.code
    }
    let response = await this.http.post('user/validateCodePhone', body, this.auth)
    if(response.status === 200) {
      let profile = await this.store.get('profile')
      profile = this.aesjs.decrypt(profile)
      profile.level = response.level
      await this.closeModal(profile)
      profile = this.aesjs.encrypt(profile)
      await this.store.set('profile', profile)
      await this.toastCtrl.presentToast({text: 'Teléfono ha sido verificado correctamente'})
    } else {
      await this.toastCtrl.presentToast({text: 'Error de código'})
      //poner el toast de error, muchas gracias.
    }
  }

  // async presentToast(text) {
  //   const toast = await this.toastCtrl.create({
  //     message: text,
  //     duration: 2000
  //   });
  //  await toast.present();
  // }

}
