import {Injectable, OnInit} from '@angular/core';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {ModalController, Platform} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {PinModalPage} from '../../pin-modal/pin-modal.page';
import {Storage} from "@ionic/storage";
import {LoadingService} from "../loading/loading.service";

@Injectable()
export class TouchLoginService implements OnInit {

    private subscription: any = null;
    public isTouch: boolean = true;
    public isLocked: boolean = false;
    private initialized = false;
    private onPauseSubscription: Subscription;
    private onResumeSubscription: Subscription;
    private user: any = null

    constructor(
        private faio: FingerprintAIO,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private auth: AuthService,
        private router: Router,
        public modalCtrl: ModalController,
        private storage: Storage,
        private loadingCtrl: LoadingService
    ) {
    }

    ngOnInit() {
        console.log('este es el touch login');
        if (this.initialized) {
            return;
        }

        this.platform.ready().then(async () => {
            // await this.loadingCtrl.dismiss()
            this.onPauseSubscription = this.platform.pause.subscribe(() => {
                this.splashScreen.show();
            });
            this.onResumeSubscription = this.platform.resume.subscribe(async () => {
                if (!this.isLocked) {
                    this.isLocked = true;
                    if (this.auth.isLogin()) {
                        if (this.isTouch) {
                            this.user = await this.storage.get('user')
                            console.log(this.user)
                            if (this.user) {
                                const modal = await this.modalCtrl.getTop()
                                console.log('modal get top', modal)
                                if (modal === undefined) this.showFingerPrint()
                            }
                            // this.login();
                            console.log('bloqueado', this.isLocked);
                        }
                    } else {
                        console.log('verificar este if');
                        // let nav = this.app.getActiveNav();

                        // nav.setRoot('LoginPage');
                        // nav.popToRoot;
                    }
                }
                console.log('no bloqueado', this.isLocked);
                this.splashScreen.hide();
                this.isLocked = false;

            });
        }).catch(er => {
            console.info('esto sería para navegador', er);
        });
    }


    showFingerPrint() {
        this.faio.isAvailable()
            .then(result => {
                console.log('huella avaliable', result);
                this.faio.show({
                    clientId: 'Identificar de huella',
                    clientSecret: 'password',   // Only necessary for Android
                    disableBackup: true,  // Only for Android(optional)
                    localizedFallbackTitle: 'Use Pin',      // Only for iOS
                    localizedReason: 'Please authenticate', // Only for iOS

                })
                    .then((result: any) => {
                        console.log('huella verificada', result);
                        this.login();
                        this.isLocked = false;

                    }).catch((error: any) => {
                    console.log('entro al catch, cuando canelo', error);
                    this.openModal();
                    // this.exitApp();
                });
            }).catch((error: any) => {
            if (this.user) this.openModal()
            console.log('entro al carch sin cancelar', error)
        });
    }

    login() {
        this.router.navigate(['/app/tabs/dashboard']);
    }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: PinModalPage,
            componentProps: {
                paramID: 123,
                paramTitle: 'Test title'
            }
        });

        return await modal.present();
    }

    exitApp() {
        this.subscription = this.platform.backButton.subscribe(() => {
            navigator['app'].exitApp();
        });
    }
}


