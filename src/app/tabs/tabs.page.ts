import {Component} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {LoadingService} from "../services/loading/loading.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import { AxiosService } from '../services/axios/axios.service';
import {ToastService} from "../services/toast/toast.service";
import {TouchLoginService} from "../services/fingerprint/touch-login.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public currentRoute: any = 'dashboard';
  ctrlCssBlur: boolean = false;
  public tabs = {
    'prices': 'prices',
    'vault': 'vault-list',
    'dashboard': 'dashboard',
    'card-invoice': 'card-invoice',
    'profile': 'profile',
    'request-credit-card': 'request-credit-card'
  };
  constructor(
    private auth: AuthService,
    private loadControl: LoadingService,
    private router: Router,
    private store: Storage,
    private aesjs: AesJsService,
    private toastCtrl: ToastService,
    private axiosService: AxiosService,
    private fingerCtrl: TouchLoginService
  ) {
    this.getActiveRoute()
  }

  async goToProfile() {
    let profile = await this.store.get('profile');
    profile = this.aesjs.decrypt(profile);
    if(profile.user.firstName){
      await this.router.navigate(['/app/tabs/profile'])
    } else {
      await this.toastCtrl.presentToast({text: 'Por favor, registre su perfil'});
      await this.router.navigate(['/create-profile'])
    }
  }

  getActiveRoute(){
    this.fingerCtrl.isTouch = true;
    this.currentRoute = this.router.url.split('/')[3];
  }

  public async requestCreditCard(): Promise<any> {
    const profile = await this.getDataProfile();
    await this.validateNavigationRequestCard(profile);
  }

  private async getDataProfile(): Promise<any> {
    const profile = await this.store.get('profile');
    return this.aesjs.decrypt(profile);
  }

  private async validateNavigationRequestCard(profile: any): Promise<any> {
    if(profile.level === 1) {
      if(profile.completed === 0) {
        await this.toastCtrl.presentToast({text: 'Para solicitar una tarjeta, debe validar sus documentos'});
        await this.router.navigate(['upload-verification-files']);
      } else {
        await this.toastCtrl.presentToast({text: 'Estamos verificando tus documentos'});
      }
    } else if (profile.level === 3 && profile.solicitud === false) {
      await this.router.navigate(['/app/tabs/request-credit-card'])
    } else if (profile.level === 3 && profile.solicitud === true) {
      await this.router.navigate(['/app/tabs/card-invoice']);
    } else {
      await this.toastCtrl.presentToast({text: 'Por favor, verifique su correo y teléfono'});
    }
  }

  verifiLoading(data: boolean) {
    this.ctrlCssBlur = data
  }

}
