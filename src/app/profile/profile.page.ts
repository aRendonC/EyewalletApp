import {Component, OnInit} from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {TimerService} from '../services/timer/timer.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {CameraProvider} from '../services/camera/camera';
import {TouchLoginService} from '../services/fingerprint/touch-login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileShow = {
    fullName: '',
    id: '',
    phone: '',
    date: '',
    country: '',
    mail: ''
  };
  profile: any;
  temporizador: any;
  pockets: any = [];
  country: any = '';
  public ctrlNavigation = 2;
  fullName: any = '';

  constructor(
    private store: Storage,
    private axios: AxiosService,
    private auth: AuthService,
    private timer: TimerService,
    private loadCtrl: LoadingController,
    private route: ActivatedRoute,
    private aesjs: AesJsService,
    private camera: CameraProvider,
    private touchCtrl: TouchLoginService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.temporizador = this.timer.temporizador;
  }
  async ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    await this.getProfile();
  }
  async getProfile() {
    this.profile = await this.store.get('profile');
    this.profile = this.aesjs.decrypt(this.profile);
    this.profileShow.id = this.profile.user.id
    this.profileShow.phone = this.profile.phone
    this.profileShow.date = this.profile.createdAt.slice(0, 10)
    if(this.profile.user.email) this.profileShow.mail = this.profile.user.email
    if(this.profile.user.firstName) this.profileShow.fullName = this.profile.user.firstName + this.profile.user.lastName
    if(this.profile.country) {
      this.profileShow.country = this.countryLowercase()
    }
  }

  countryLowercase() {
    const countryUpper = this.profile.country[0];
    const countryLower = this.profile.country.slice(1).toLowerCase();
    return countryUpper + countryLower;
  }

  async foto() {
    const alert = await this.alertCtrl.create({
      buttons: [
        {
          text: 'Tomar foto',
          handler: () => this.tomarFoto()
        },
        {
          text: 'Seleccione foto',
          handler: () => this.seleccionarFoto()
        },
        {
          text: 'cancelar',
          role: 'cancel',
        }
      ]
    })
       await alert.present();
  }

  tomarFoto() {
    this.touchCtrl.isTouch = false;
    this.camera.getPhoto().then((data: any) => {
      this.enviarServidor(data);
    }).catch(() => {
      this.touchCtrl.isTouch = true;
    });
  }

  seleccionarFoto() {
    this.touchCtrl.isTouch = false;
    this.camera.getPhotoDirectory().then((data: any) => {
      this.enviarServidor(data);
    }).catch(async (error) => {
      const alert = await this.alertCtrl.create({
        header: 'imagen no seleccionada',
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel',
          }
        ],
      })
      await alert.present();
      this.touchCtrl.isTouch = true;
    });
  }
  enviarServidor(data64) {
    this.axios.post('file/uploadFileAvatar',
        { file: data64 },
        this.auth
    ).then(async (data) => {
      this.touchCtrl.isTouch = true;
      // this.auth.user_Info.url_img = data;
      const toast = await this.toastCtrl.create({
        message: 'foto subida correctamente',
        duration: 3000,
      });
      await toast.present();
    }).catch(() => {
      this.touchCtrl.isTouch = true;
    });
  }



}
