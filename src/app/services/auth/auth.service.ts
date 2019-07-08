import {Injectable} from '@angular/core';
import {AxiosService} from '../axios/axios.service';
import {MenuController, ToastController} from '@ionic/angular';
import {TimerService} from '../timer/timer.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import { DeviceService } from '../device/device.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = {
    id: null,
    rolId: null,
    segundoFactor: null,
    accessToken: null,
  };

   constructor(private  api: AxiosService,
                    private toastController: ToastController,
                    private timer: TimerService,
                    private router: Router,
                    private menu: MenuController,
                    private store: Storage,
                    private device: DeviceService
  ) {
    this.intentarLogin();
  }

  async login(user, password) {
    let device: any = await this.device.getDataDevice();
    console.log('Data of login: ', device);
    //device.uuid

    return new Promise((resolve) => {
      this.api.post('auth/login', {email: user, password: password, deviceId: "B958C608-DC31-44F7-9581-5AD5D649359A"})
        .then(async (data: any) => {
          console.log('data response', data.hasOwnProperty(404));
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
            this.store.set('user', this.usuario)
            console.log(await this.store.get('user'))
            // localStorage.setItem('user', JSON.stringify(this.usuario));
            // this.timer.iniciarTemporizador();
            console.info('data', data)
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

  async intentarLogin() {
    // this.usuario = JSON.parse(window.localStorage.getItem('user'));
    this.usuario = await this.store.get('user');
    if (this.usuario == null) {
      this.usuario = {
        id: null,
        rolId: null,
        segundoFactor: null,
        accessToken: null
      };
    }
  }

  setUserId(userId) {
    this.usuario.id = userId;
    localStorage.setItem('user', JSON.stringify(this.usuario));
  }

  async isLogin() {
    const user = await this.store.get('user');
    console.info(user)
    return !!user;
  }

  logout() {
    this.timer.logout(false);
    // localStorage.removeItem('user');
    // this.store.remove('user')
    // this.store.clear();
    this.menu.enable(false);
    this.router.navigate(['']);
  }

}
