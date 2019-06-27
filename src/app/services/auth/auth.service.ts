import {Injectable} from '@angular/core';
import {AxiosService} from '../axios/axios.service';
import {MenuController, NavController, ToastController} from '@ionic/angular';
import {TimerService} from '../timer/timer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario = {
    id: null,
    rolId: null,
    segundoFactor: null,
    serializeToken: null,
  };

  constructor(private  api: AxiosService,
              private toastController: ToastController,
              private timer: TimerService,
              private nav: NavController,
              private menu: MenuController,
  ) {
    this.intentarLogin();
  }

  login(usuario, password) {
    return new Promise((resolve, reject) => {
      this.api.post('auth/login', {email: usuario, password})
        .then(async (data: any) => {
          console.log(data);
          if (data.hasOwnProperty('error') === false) {
            this.usuario = data;
            localStorage.setItem('user', JSON.stringify(this.usuario));
            this.timer.iniciarTemporizador();
            resolve(data);
          } else {
            resolve(null);
          }
        })
        .catch(err => console.log(err));
    }).catch((error) => {
      console.log(error);
    });
  }

  accessParam() {
    if (this.usuario != null) {
      return this.usuario.serializeToken;
    }
    return null;
  }

  intentarLogin() {
    this.usuario = JSON.parse(window.localStorage.getItem('user'));
    if (this.usuario == null) {
      this.usuario = {
        id: null,
        rolId: null,
        segundoFactor: null,
        serializeToken: null
      };
    }
  }

  setUserId(userId) {
    this.usuario.id = userId;
    localStorage.setItem('user', JSON.stringify(this.usuario));
  }

  isLogin() {
    const user = localStorage.getItem('user');
    return user != null && this.usuario.serializeToken != null && this.usuario.id != null;
  }

  logout() {
    this.timer.logout(false);
    localStorage.removeItem('user');
    localStorage.clear();
    this.menu.enable(false);
    this.nav.navigateForward('login');
  }

}
