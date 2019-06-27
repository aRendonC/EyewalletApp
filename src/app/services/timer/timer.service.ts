import {Injectable} from '@angular/core';
import {AlertController, MenuController} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TimerService {

  tiempoLimiteSesion = 1; // se coloca el tiempo que se desea que dure la sesión activa
  tiempo: any;
  temporizador = {
    minutos: 0,
    segundos: 0
  };
  // tslint:disable-next-line:variable-name
  contador_s = 0;
  // tslint:disable-next-line:variable-name
  contador_m = 0;

  constructor(private alertCtrl: AlertController, private menu: MenuController, private router: Router) {
  }

  iniciarTemporizador() {


    this.tiempo = setInterval(() => {
      if (this.contador_s === 60) {
        this.contador_s = 1;
        this.contador_m++;
        this.temporizador.minutos = this.contador_m;
        if (this.contador_m === this.tiempoLimiteSesion) {
          this.contador_m = 0;
          this.resetTimer();
          this.logout();
        }
      }
      this.temporizador.segundos = this.contador_s;
      this.contador_s++;
    }, 1000);
  }

  logout(alerta = true) {
    localStorage.removeItem('user');
    localStorage.clear();
    this.resetTimer();
    this.router.navigate(['']);
    this.menu.enable(false);
    if (alerta) {
      this.presentAlerta();
    }
  }

  async presentAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'INFORMACIÓN',
      subHeader: 'Sesión terminada',
      message: 'Señor usuario por seguridad su sesión ha sido expirada.',
      buttons: ['cerrar']
    });

    await alert.present();
  }

  resetTimer() {
    clearInterval(this.tiempo);
    this.contador_m = 0;
    this.contador_s = 0;
    this.temporizador = {
      minutos: 0,
      segundos: 0
    };
  }
}
