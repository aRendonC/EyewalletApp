import {Component, OnInit} from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {TimerService} from '../services/timer/timer.service';
import {AlertController,} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {CameraProvider} from '../services/camera/camera';
import {Camera} from '@ionic-native/camera/ngx';
import {LoadingService} from "../services/loading/loading.service";
import {TouchLoginService} from "../services/fingerprint/touch-login.service";
import {ToastService} from "../services/toast/toast.service";
import {environment} from "../../environments/environment";
import {LanguageService} from "../services/language/language.service";
import {DataLocalService} from "../services/data-local/data-local.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
    public userVerifications: any = {
        email: ''
    };
    isOn = false;
    public cssCtrlContents = true;
    public cssGradient = 'backGroundGradient';
    languages = [];
    selectedLanguage = '';
    public type: string = 'avatar';
    urlAvatar = environment.urlAvatar;
    avatar: any = '../../assets/images/profilePage/nophoto.png';
    profileShow: any = {
        fullName: '',
        id: '',
        phone: '',
        date: '',
        country: '',
        mail: '',
    };
    scanSub: any;
    public profile: any;
    public temporizador: any;
    public pockets: any = [];
    public country: any = '';
    public ctrlNavigation = 2;
    public fullName: any = '';
    public word: any;
    public profilePic: any;
    public verify: any;
    placeHolder: any = '';

    constructor(
        private store: DataLocalService,
        private axios: AxiosService,
        private auth: AuthService,
        private timer: TimerService,
        private loadingCtrl: LoadingService,
        private route: ActivatedRoute,
        private camera: Camera,
        private alertCtrl: AlertController,
        private cameraProvider: CameraProvider,
        private toastCtrl: ToastService,
        private touchCtrl: TouchLoginService,
        private languageService: LanguageService,
        private translateService: TranslateService,
        private router: Router,
    ) {
        this.temporizador = this.timer.temporizador;
    }

    async ngOnInit() {
        this.languages = LanguageService.getLanguages();
        this.selectedLanguage = this.languageService.selected;
        this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
        this.profile = await this.store.getDataLocal('profile');
        await this.getPic();
        await this.getProfile();
    }

    ionViewDidEnter() {
        let elementDashboard: any = document.getElementsByTagName('app-profile');
        elementDashboard[0].classList.add("margins-dashboard")
    }

    async getPic() {
        this.profilePic = await this.store.getDataLocal('profile');
    }

    async getProfile() {
        this.userVerifications = await this.axios.get('user-verification/status', this.auth, null);
        this.userVerifications = this.userVerifications.data;
        this.setStorageVerification(this.userVerifications.data);
        this.profile = await this.store.getDataLocal('profile');
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
                    text: this.translateService.instant('PROFILE.TakePhoto'),
                    handler: async () => {
                        this.touchCtrl.isTouch = false;
                        let takePhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.CAMERA);
                        this.avatar = '';
                        this.avatar = await this.setPhoto(takePhoto);
                        if (takePhoto) {
                            await this.loadingCtrl.present({text: this.translateService.instant('PROFILE.LoadingPhoto'), cssClass: 'textLoadingBlack'});
                            let responsePhoto: any = await this.cameraProvider.sendPhoto(takePhoto, this.type, false);
                            if (responsePhoto.status === 200) {
                                this.touchCtrl.isTouch = true;
                                this.avatar = this.urlAvatar + responsePhoto.data;
                                await this.loadingCtrl.dismiss();
                                await this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.PhotoUploadOk')});
                                this.profile.avatar = responsePhoto.data;
                                await this.store.setDataLocal('profile', this.profile);

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
                    text: this.translateService.instant('PROFILE.SelectPhoto'),
                    handler: async () => {
                        this.touchCtrl.isTouch = false;
                        let selectPhoto: any = await this.cameraProvider.getPhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
                        if (selectPhoto) {
                            await this.loadingCtrl.present({text: this.translateService.instant('PROFILE.LoadingPhoto'), cssClass: 'textLoadingBlack'});
                            this.avatar = '';
                            this.avatar = await this.setPhoto(selectPhoto);
                            let responsePhoto: any = await this.cameraProvider.sendPhoto(selectPhoto, this.type, false);
                            if (responsePhoto.status === 200) {
                                this.touchCtrl.isTouch = true;
                                this.avatar = this.urlAvatar + responsePhoto.data;
                                await this.loadingCtrl.dismiss();
                                await this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.PhotoUploadOk')});
                                this.profile.avatar = responsePhoto.data;
                                await this.store.setDataLocal('profile', this.profile);
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
                    text: this.translateService.instant('VAULT_LIST.Cancel'),
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
            this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.SendingEmail')});
        } else {
            this.toastCtrl.presentToast({text: 'Tenemos problemas con reenviar el correo, por favor reinicie la aplicación o espere'});
        }
    }

    notifications() {
        this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.ComingSoon')});
    }

    safety() {
        this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.ComingSoon')});
    }

    terms() {
        this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.ComingSoon')});
    }

    invite() {
        this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.ComingSoon')});
    }

    deleteAccount() {
        this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.ComingSoon')});
    }

    secondFactor() {
        this.toastCtrl.presentToast({text: this.translateService.instant('PROFILE.ComingSoon')});
    }

    eyewalletWeb() {
        this.toastCtrl.presentToast({ text: this.translateService.instant('PROFILE.ComingSoon') });
    }

    async setStorageVerification(userVerification) {
        await this.store.setDataLocal('userVerification', userVerification)
    }

    setPhoto(base64) {
        return new Promise(resolve => {
            resolve("data:image/jpeg;base64," + base64);
        })
    }

    async selectLanguage() {
        await this.languageService.setLanguage(this.selectedLanguage);
    }
}
