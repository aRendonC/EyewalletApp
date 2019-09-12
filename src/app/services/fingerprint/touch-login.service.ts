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
    public isLocked: boolean = true;
    private initialized = false;
    private onPauseSubscription: Subscription;
    private onResumeSubscription: Subscription;
    private user: any = null;

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
        if (this.initialized) {
            return;
        }

        this.platform.ready().then(async () => {
            // await this.loadingCtrl.dismiss()
            this.onPauseSubscription = this.platform.pause.subscribe(() => {
                // this.splashScreen.show();
            });
            this.onResumeSubscription = this.platform.resume.subscribe(async () => {
                if (this.isLocked) {
                    if (this.auth.isLogin()) {
                        if (this.isTouch) {
                            this.user = await this.storage.get('user');
                            if (this.user) {
                                const modal = await this.modalCtrl.getTop();
                                if (modal === undefined) this.showFingerPrint()
                            }
                            // this.login();
                        }
                    } else {
                        // let nav = this.app.getActiveNav();

                        // nav.setRoot('LoginPage');
                        // nav.popToRoot;
                    }
                }
                // this.splashScreen.hide();
                this.isLocked = true;

            });
        }).catch(er => {
        });
    }


    showFingerPrint() {
        this.faio.isAvailable()
            .then(result => {
                this.faio.show({
                    clientId: 'Identificar de huella',
                    clientSecret: 'password',   // Only necessary for Android
                    disableBackup: true,  // Only for Android(optional)
                    localizedFallbackTitle: 'Use Pin',      // Only for iOS
                    localizedReason: 'Please authenticate', // Only for iOS

                })
                    .then((result: any) => {
                        this.login();
                        this.isLocked = true;

                    }).catch((error: any) => {
                    this.openModal();
                    // this.exitApp();
                });
            }).catch((error: any) => {
            if (this.user) this.openModal();
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


