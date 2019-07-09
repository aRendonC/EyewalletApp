import {Injectable} from '@angular/core';
import {AxiosService} from '../axios/axios.service';
import {MenuController, ModalController, ToastController} from '@ionic/angular';
import {TimerService} from '../timer/timer.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import { DeviceService } from '../device/device.service';
import {PinModalPage} from "../../pin-modal/pin-modal.page";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario: any = {
    id: null,
    rolId: null,
    segundoFactor: null,
    accessToken: null,
  };

  constructor(
      private  api: AxiosService,
      private toastController: ToastController,
      private timer: TimerService,
      private router: Router,
      private menu: MenuController,
      private store: Storage,
      private device: DeviceService,
      private modalCtrl: ModalController
  ) {
    this.persistenceLogin();
  }
//This function is a loginService, parameter required user, password
  async login(user, password) {
    let device: any = await this.device.getDataDevice();
    console.log('Data of login: ', device);
    if(!device.uuid) device.uuid = '7219d0c4ee046311'
    return new Promise((resolve) => {
      this.api.post('auth/login', {email: user, password: password, deviceId: device.uuid})
        .then(async (data: any) => {
          console.log('data response', data);
          if (data.status === 404) {
            //no existe usuario
            resolve(null)
          } if(data.status === 401) {
            resolve(null)
            //no está autorizado por credenciales (puede estar registrado)
          } if(data.status === 500) {
            resolve(null)
            //error de la plataforma o datos incorrectos
          } else {
            this.usuario = data.data;
            await this.store.set('user', this.usuario);
            console.log(this.usuario);
            // this.timer.iniciarTemporizador();
            console.info('data', data);
            resolve(data);
          }
        })
        .catch(err => console.log('error data response', err));
    }).catch((error) => {
      console.log(error);
    });
  }

  accessParam() {
    if (this.usuario != null) {
      return this.usuario.accessToken;
    }
    return null;
  }

  async persistenceLogin() {
    this.usuario = await this.store.get('user');
    console.log('persistencia de usuario0', this.usuario)
    if (this.usuario.pin) {
      await this.openModal()
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PinModalPage,
      componentProps: {
        paramID: 123,
        paramTitle : 'Test title'
      }
    });

    return await modal.present();
  }

  setUserId(userId) {
    this.usuario.id = userId;
    localStorage.setItem('user', JSON.stringify(this.usuario));
  }

  async isLogin() {
    let user = await this.store.get('user');
    console.info(user);
    return !!user;
  }

  async logout() {
    // this.timer.logout(false);
    await this.store.remove('user')
    await this.store.clear();
    await this.menu.enable(false);
    await this.router.navigate(['']);
  }

}
