import {Component, OnInit} from '@angular/core';
import {TimerService} from '../services/timer/timer.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {CameraProvider} from '../services/camera/camera';
import {AlertController, ToastController} from '@ionic/angular';
import {DeviceService} from '../services/device/device.service';


const MEDIA_FILES_KEY = 'mediaFiles';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public transaction = 'transaction';

  private dataDevice = null;
  private usuario: any = null;
  temporizador: any;

  constructor(private  timer: TimerService,
              private axios: AxiosService,
              private auth: AuthService,
              private camera: CameraProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private device: DeviceService,) {
    this.temporizador = timer.temporizador;
    this.dataDevice = this.deviceData();
  }

  ngOnInit() {
  }

  async photo() {
    const alert = await this.alertCtrl.create({
      buttons: [
        {
          text: 'tomar foto',
          handler: () => this.takePhoto()
        },
        {
          text: 'seleccionar foto',
          handler: () => this.selecPhoto()
        },
        {
          text: 'cancelar',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }

  takePhoto() {
    this.camera.getPhoto().then((data: any) => {
      this.sendServer(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  selecPhoto() {
    this.camera.getPhotoDirectory().then((data: any) => {
      this.sendServer(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  async sendServer(data64) {
    this.axios.post('profile/upload-photo',
      {pic: data64},
      this.auth
    ).then(async (data) => {
      this.usuario.url_img = data;
      const toast = await this.toastCtrl.create({
        message: 'foto enviada correctamente.',
        duration: 2000
      });
      toast.present();
    }).catch((error) => {
      console.log(error);
    });
  }

  async deviceData() {
    this.dataDevice = await this.device.getDataDevice();
  }

}
