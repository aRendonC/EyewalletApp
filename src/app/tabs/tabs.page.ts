import {Component} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {LoadingService} from "../services/loading/loading.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  ctrlCssBlur: boolean = false;

  constructor(
    private auth: AuthService,
    private loadControl: LoadingService,
    private router: Router,
    private store: Storage,
    private aesjs: AesJsService,
    private toastCtrl: ToastController
  ) {
  }

  async goToProfile() {
    let profile = await this.store.get('profile');
    console.log(profile);
    profile = this.aesjs.decrypt(profile);

    if(profile.user.firstName){
      await this.router.navigate(['/app/tabs/profile'])
    } else {
      await this.presentToastTabs('Por favor, registre su perfil');
      await this.router.navigate(['/create-profile'])
    }
  }

  async presentToastTabs(text) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    await toast.present()
  }

  async requestCreditCard() {
    let profile = await this.store.get('profile');
    profile = this.aesjs.decrypt(profile);
    console.log(profile)
    if(profile.level !== 3) {
      await this.presentToastTabs('Para solicitar una tarjeta, debe validar sus documentos')
    } else {
      await this.router.navigate(['/app/tabs/request-credit-card'])
    }
  }

  verifiLoading(data: boolean) {
    this.ctrlCssBlur = data
  }
}
