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
import {Camera} from "@ionic-native/camera/ngx";

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
    private camera: Camera,
    private alertCtrl: AlertController,
    private cameraProvider: CameraProvider,
    private toastCtrl: ToastController,
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

  async photo() {
    const alert = await this.alertCtrl.create({
      buttons: [
        {
          text: 'Tomar foto',
          handler: async () => {
            let takePhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.CAMERA);
            console.log(takePhoto);
            if (takePhoto) {
              let responsePhoto: any = await this.cameraProvider.sendPhoto(takePhoto)
              if(responsePhoto.status === 200) {
                await this.presentToast('Foto cargada correctamente')

              } else {
                await this.presentToast(responsePhoto.error.msg)
              }
            }
            // if(takePhoto.status === 200) {
            //  await this.presentToast('Documento cargado correctamente')
            // } else {
            //   await this.presentToast(takePhoto.error.msg)
            // }
          }
        },
        {
          text: 'Seleccione foto',
          handler: async () => {
            let selectPhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
            if (selectPhoto) {
              let responsePhoto: any = await this.cameraProvider.sendPhoto(selectPhoto)
              if(responsePhoto.status === 200) {
                await this.presentToast('Foto cargada correctamente')
              } else {
                await this.presentToast(responsePhoto.error.msg)
              }
            }
            // if(selectPhoto.status === 200) {
            //   await this.presentToast('Documento cargado correctamente')
            // } else {
            //   await this.presentToast(selectPhoto.error.msg)
            // }
            console.log(selectPhoto)
          }
        },
        {
          text: 'cancelar',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    await toast.present();
  }
}
