import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AxiosService} from "../../services/axios/axios.service";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {ListPocketsPage} from "../../list-pockets/list-pockets.page";
import {enterAnimation} from "../../animations/enter";
import {leaveAnimation} from "../../animations/leave";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../services/loading/loading.service";
import {ToastService} from "../../services/toast/toast.service";
import {DataLocalService} from "../../services/data-local/data-local.service";
import {OverlayEventDetail} from '@ionic/core';

import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-pocket',
    templateUrl: './pocket.component.html',
    styleUrls: ['./pocket.component.scss'],
})

export class PocketComponent implements OnInit {
    public counters = {
        sendCash: 0,
        receiveCash: 0,
        qualify: 0,
        logOut: 0,
        history: 0
    };
    public margins = {
        sendCash: -65,
        receiveCash: -65,
        qualify: -65,
        logOut: -65,
        history: -65
    };
    pockets: any = null;
    @Input() urlPresent: any = '';
    @Input() ctrlNavigation: number = 0;
    @Output() dataBalance = new EventEmitter<[]>();
    @Input() pocket: any = '';
    @Input() listVaultLength: boolean = false;
    imgLeft: string = null;
    imgRight: string = null;
    classLeft: string = null;
    currencyId: any = null;


    constructor(
        private http: AxiosService,
        public modalCtrl: ModalController,
        protected auth: AuthService,
        private router: Router,
        private store: DataLocalService,
        private toastCtrl: ToastService,
        private loadingCtrl: LoadingService,
        private alertCtrl: AlertController,
        private axiosService: AxiosService,
        private authService: AuthService,
        private platform: Platform,
        private iab: InAppBrowser,
        private translateService: TranslateService,
    ) {
        this.classLeft = "resize-logo-left1";
        this.imgLeft = "../../assets/img/btn-left-s.svg";
        this.imgRight = "../../assets/img/btn-right.svg";
    }

    async ngOnInit() {

    }

    async getPocketStore() {
        return this.pocket = await this.store.getDataLocal('selected-pocket');
    }

    async openPocketsModal() {
        if (!this.pocket) this.pocket = await this.getPocketStore();
        await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
        this.pockets = await this.http.post('user-wallet/index', {currencyId: this.pocket.currencyId}, this.auth);
        console.log(this.pockets);
        const modalPocket: HTMLIonModalElement = await this.modalCtrl.create({
            component: ListPocketsPage,
            animated: true,
            enterAnimation: enterAnimation,
            leaveAnimation: leaveAnimation,
            componentProps: {
                pockets: this.pockets
            }
        });

        modalPocket.onDidDismiss().then(async (pocket: OverlayEventDetail) => {
            console.log(pocket);
            if (pocket.role == 'new-pocket') {
                this.store.setDataLocal('selected-pocket', this.pocket);
            }
            if (pocket.data) {
                this.pocket = pocket.data;
                let body = {
                    userId: this.pocket.userId,
                    type: 0,
                    address: this.pocket.address,
                    currencyShortName: this.pocket.currency.shortName
                };
                console.log(this.pocket);
                await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
                let dataResponse = await this.http.post('transaction/index', body, this.auth);
                if (dataResponse.status === 200) {
                    await this.loadingCtrl.dismiss();
                    dataResponse.pocket = this.pocket;
                    this.dataBalance.emit(dataResponse)
                } else {
                    await this.toastCtrl.presentToast({text: dataResponse.error.msg})
                }
            }

        });
        await this.loadingCtrl.dismiss();
        return await modalPocket.present();
    }

    async receiveCash() {
        if (this.counters.receiveCash == 1) {
            await this.router.navigate([
                '/receive-funds'], {
                queryParams: {
                    pocket: JSON.stringify(this.pocket)
                }, queryParamsHandling: 'merge'
            });
        } else {
            this.counters.receiveCash = 1;
            this.animationsTabs('receiveCash')
        }

    }

    async sendCash() {
        if (this.counters.sendCash == 1) {
            let profile = await this.store.getDataLocal('profile');
            if (profile.level === 0) {
                await this.toastCtrl.presentToast({text: this.translateService.instant('TOAST_MSG.DocumentsNoVerified')})
            } else {
                await this.router.navigate(['/send-currency', {pocket: JSON.stringify(this.pocket)}]);
            }
        } else {
            this.counters.sendCash = 1;
            this.animationsTabs('sendCash')
        }

    }

    openUrl(url) {
        if (this.counters.qualify == 1) {
            this.platform.ready().then(() => {
                if (!url) {
                    (this.platform.is('ios')) ? url = 'https://apps.apple.com/us/app/eyewallet/id1338756423?l=es&ls=1' : url = 'https://play.google.com/store/apps/details?id=com.eyewallet.io'
                }
                const browser = this.iab.create(url, '_blank');
            });
        } else {
            this.counters.qualify = 1;
            this.animationsTabs('qualify')
        }

    }

    animationsTabs(identifier) {
        console.log(this.margins[identifier])
        let interval = setInterval(() => {
            this.margins[identifier] = this.margins[identifier] + 1;
            if (this.margins[identifier] == 0) {
                setTimeout(() => {
                    let intervalClose = setInterval(() => {
                        this.margins[identifier] = this.margins[identifier] - 1;
                        if (this.margins[identifier] == -65) {
                            this.counters[identifier] = 0;
                            clearInterval(intervalClose)
                        }
                    }, 2)
                }, 1000)
                clearInterval(interval)
            }
        }, 2)
    }

    async goToHome() {
        await this.router.navigate(['/app/tabs/dashboard']);
    }

    async confirmLogOut() {
        if (this.counters.logOut == 1) {
            const alert = await this.alertCtrl.create({
                header: this.translateService.instant('GENERAL.LogOut'),
                message: this.translateService.instant('GENERAL.CanLogOut'),
                buttons: [
                    {
                        text: this.translateService.instant('GENERAL.Cancel'),
                        role: 'cancel',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    },
                    {
                        text: this.translateService.instant('GENERAL.Confirm'),
                        handler: async () => {
                            await this.logOut();
                            await this.toastCtrl.presentToast({text: this.translateService.instant('GENERAL.LogOutOk')})
                        }
                    }
                ]
            });
            await alert.present();
        } else {
            this.counters.logOut = 1;
            this.animationsTabs('logOut')
        }

    }

    async logOut() {
        await this.loadingCtrl.present({});
        await this.auth.logout()
    }


    public clickButtonLeftCinco(): void {
        this.router.navigate(['/app/tabs/vault']);
    }

    public clickButtonRightCinco(): void {
        this.router.navigate(['/app/tabs/vault']);
    }

    public clickButtonLeftSeis(): void {
        this.router.navigate(['/app/tabs/vault-list']);
    }

    public clickButtonLeftSeven(): void {
        this.router.navigate(['/app/tabs/vault'])
    }

    async goHistoryExchange() {
        if (this.counters.history == 1) {
            await this.router.navigate(['/app/tabs/history-exchange']);
         } else {
            this.counters.history = 1;
            this.animationsTabs('history')
        }

    }

    // async onPanLeft($event) {
    //     console.log('panlefff', $event)
    //     console.log('panlefff this.marginsRight', this.marginsRight)
    //     if (this.marginsRight >= -1) {
    //         // await this.onPanEnd(null);
    //         await this.sendCash();
    //         setTimeout(() => {
    //             this.marginsRight = 0;
    //             for (let i = 0; i <= 65; i++) {
    //                 this.marginsRight = this.marginsRight - 1;
    //
    //             }
    //         }, 1000)
    //         console.log('ejecutar accion')
    //     } else {
    //
    //         this.marginsRight = this.marginsRight - $event.deltaX
    //
    //     }
    // }

    // async onPanEnd($event) {
    //     console.log('pan rigth', $event)
    //     if (this.marginsRight >= -75) {
    //         this.marginsRight = this.marginsRight - $event.deltaX
    //         // await this.onPanEnd(null);
    //
    //     } else {
    //
    //         console.log('ejecutar accion')
    //
    //     }
    //     // console.log(this.marginsRight)
    //     // if(this.marginsRight <= 2 && this.marginsRight >= -1) {
    //     //     await this.sendCash();
    //     // }
    //     // this.marginsRight = 0;
    //     // for (let i = 0; i <= 65; i++) {
    //     //     this.marginsRight = this.marginsRight - 1;
    //     //
    //     // }
    //     // (click)="sendCash()"
    //     // (click)="receiveCash()"
    //
    // }
    //
    // finishPaned($event) {
    //     console.log($event)
    //     this.marginsRight = 0;
    //     for (let i = 0; i <= 65; i++) {
    //         this.marginsRight = this.marginsRight - 1;
    //
    //     }
    // }
}

