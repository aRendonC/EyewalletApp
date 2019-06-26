import {Injectable} from '@angular/core';
import {AlertController, MenuController, NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class TimerService {

  tiempo: any;
  temporizador = {
    minutos: 0,
    segundos: 0
  };
  // tslint:disable-next-line:variable-name
  contador_s = 0;
  // tslint:disable-next-line:variable-name
  contador_m = 0;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private menu: MenuController) {
  }

  iniciarTemporizador() {


    this.tiempo = setInterval(() => {
      if (this.contador_s === 60) {
        this.contador_s = 1;
        this.contador_m++;
        this.temporizador.minutos = this.contador_m;
        // se colocan los minutos que se quieren controlar
        if (this.contador_m === 25) {
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
    this.navCtrl.navigateRoot('/login');
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
