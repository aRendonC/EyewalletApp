import {Component, OnInit} from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {TimerService} from '../services/timer/timer.service';
import {AlertController,} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {CameraProvider} from '../services/camera/camera';
import {Camera} from '@ionic-native/camera/ngx';
import {LoadingService} from "../services/loading/loading.service";
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {ToastService} from "../services/toast/toast.service";
import {environment} from "../../environments/environment";
import {LanguageService} from "../services/language/language.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public userVerifications: any = {
    email: ''
  };
  languages = [];
  selectedLanguage = '';
  public type: string = 'avatar';
  urlAvatar = environment.urlAvatar;
  avatar: any = '';
  profileShow: any = {
    fullName: '',
    id: '',
    phone: '',
    date: '',
    country: '',
    mail: '',
  };
  public profile: any;
  public temporizador: any;
  public pockets: any = [];
  public country: any = '';
  public ctrlNavigation = 2;
  public fullName: any = '';
  public word: any;
  public profilePic: any;
  public verify: any;

  constructor(
    private store: Storage,
    private axios: AxiosService,
    private auth: AuthService,
    private timer: TimerService,
    private loadingCtrl: LoadingService,
    private route: ActivatedRoute,
    private aesjs: AesJsService,
    private camera: Camera,
    private alertCtrl: AlertController,
    private cameraProvider: CameraProvider,
    private toastCtrl: ToastService,
    private touchCtrl: TouchLoginService,
    private languageService: LanguageService
  ) {
    this.temporizador = this.timer.temporizador;
  }

  async ngOnInit() {
    this.languages = this.languageService.getLanguages();
    console.log(this.languages)
    this.selectedLanguage = this.languageService.selected;
    console.log('lenguage seleccionado', this.selectedLanguage)
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    this.profile = await this.store.get('profile');
    await this.getPic();
    await this.getProfile();
    console.log('avatar: ',this.urlAvatar+this.profile.avatar);
  }
  ionViewDidEnter(){
    let elementDashboard: any = document.getElementsByTagName('app-profile');
    console.log(elementDashboard);
    elementDashboard[0].classList.add("margins-dashboard")
  }

  async getPic() {
    this.profilePic = await this.store.get('profile');
    this.profilePic = this.aesjs.decrypt(this.profile);
  }

  async getProfile() {
    this.userVerifications = await this.axios.get('user-verification/status', this.auth, null);
    this.userVerifications = this.userVerifications.data;
    console.log(this.userVerifications);
    this.setStorageVerification(this.userVerifications.data);
    this.profile = await this.store.get('profile');
    this.profile = this.aesjs.decrypt(this.profile);
    this.avatar = this.urlAvatar + this.profile.avatar;
    this.profileShow.id = this.profile.user.id;
    this.profileShow.phone = this.profile.phone;
    this.profileShow.date = this.profile.createdAt.slice(0, 10);
    if (this.profile.user.email) {
      this.profileShow.mail = this.profile.user.email;
    }
    this.lowercaseNames(this.profile.user.firstName);
    this.profile.user.firstName = this.word;
    this.lowercaseNames(this.profile.user.lastName);
    this.profile.user.lastName = this.word;
    if (this.profile.user.firstName) {
      this.profileShow.fullName = this.profile.user.firstName + ' ' + this.profile.user.lastName;
    }
    if (this.profile.country) {
      this.profileShow.country = this.countryLowercase();
    }
  }

  lowercaseNames(word) {
    word = word.split(' ');
    for (let i = 0, x = word.length; i < x; i++) {
      word[i] = word[i][0].charAt(0).toUpperCase() + word[i].slice(1).toLowerCase();
    }
    word = word.join(' ');
    this.word = word;
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
            this.touchCtrl.isTouch = false;
            await this.loadingCtrl.present({});
            let takePhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.CAMERA);
            console.log('foto seleccionada', takePhoto);
            this.avatar = '';
            this.avatar = await this.setPhoto(takePhoto);
            console.log('this.avar-------->', this.avatar);
            if (takePhoto) {
              let responsePhoto: any = await this.cameraProvider.sendPhoto(takePhoto, this.type, false);
              if (responsePhoto.status === 200) {
                this.touchCtrl.isTouch = true;
                this.avatar = this.urlAvatar + responsePhoto.data;
                await this.loadingCtrl.dismiss();
                await this.toastCtrl.presentToast({text: 'Foto cargada correctamente'});
                this.profile.avatar = responsePhoto.data;
                this.profile = this.aesjs.encrypt(this.profile);
                await this.store.set('profile', this.profile);

                await this.ngOnInit()
              } else {
                this.touchCtrl.isTouch = true;
                await this.loadingCtrl.dismiss();
                await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
              }
            }
          }
        },
        {
          text: 'Seleccione foto',
          handler: async () => {
            this.touchCtrl.isTouch = false;
            await this.loadingCtrl.present({});
            let selectPhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
            console.log('foto seleccionada', selectPhoto);
            if (selectPhoto) {
              this.avatar = '';
              this.avatar = await this.setPhoto(selectPhoto);
              console.log('this.avatar--------->', this.avatar);
              let responsePhoto: any = await this.cameraProvider.sendPhoto(selectPhoto, this.type, false);
              if (responsePhoto.status === 200) {
                this.touchCtrl.isTouch = true;
                this.avatar = this.urlAvatar + responsePhoto.data;
                await this.loadingCtrl.dismiss();
                await this.toastCtrl.presentToast({text: 'Foto cargada correctamente'});
                this.profile.avatar = responsePhoto.data;
                this.profile = this.aesjs.encrypt(this.profile);
                await this.store.set('profile', this.profile);
                await this.ngOnInit()
              } else {
                this.touchCtrl.isTouch = true;
                await this.loadingCtrl.dismiss();
                await this.toastCtrl.presentToast({text: responsePhoto.error.msg})
              }
            }
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

  async sendMail() {
    const bodyMail: any = {type: 'email'};
    this.verify = await this.axios.post('user/sendCodeVerification', bodyMail, this.auth);
    if (this.verify.status === 200) {
      this.toastCtrl.presentToast({text: 'Correo enviado'});
    } else {
      this.toastCtrl.presentToast({text: 'Tenemos problemas con reenviar el correo, por favor reinicie la aplicación o espere'});
    }
  }

  notifications() {
    this.toastCtrl.presentToast({text: 'Próximamente'});
  }

  safety() {
    this.toastCtrl.presentToast({text: 'Próximamente'});
  }

  terms() {
    this.toastCtrl.presentToast({text: 'Próximamente'});
  }

  invite() {
    this.toastCtrl.presentToast({text: 'Próximamente'});
  }

  deleteAccount() {
    this.toastCtrl.presentToast({text: 'Próximamente'});
  }

  secondFactor() {
    this.toastCtrl.presentToast({text: 'Próximamente'});
  }

  eyewalletWeb() {
    this.toastCtrl.presentToast({text: 'Próximamente'});
  }

  async setStorageVerification(userVerification) {
    const dataEncrypt = this.aesjs.encrypt(userVerification);
    await this.store.set('userVerification', dataEncrypt)
  }

  setPhoto(base64){
    return new Promise(resolve => {
     resolve("data:image/jpeg;base64,"+ base64);
    })
  }

  selectLanguage(){
    console.log(this.selectedLanguage)
    this.languageService.setLanguage(this.selectedLanguage)
  }
}
