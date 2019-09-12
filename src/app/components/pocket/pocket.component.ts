import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AxiosService} from "../../services/axios/axios.service";
import {AlertController, ModalController, Platform} from "@ionic/angular";
import {ListPocketsPage} from "../../list-pockets/list-pockets.page";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "../../services/loading/loading.service";
import {ToastService} from "../../services/toast/toast.service";
import {DataLocalService} from "../../services/data-local/data-local.service";
import {OverlayEventDetail} from '@ionic/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {TranslateService} from "@ngx-translate/core";
import { SocketIoService } from 'src/app/services/socketIo/socket-io.service';

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
        logOut: 0
    };
    public margins = {
        sendCash: -65,
        receiveCash: -65,
        qualify: -65,
        logOut: -65
    };
    pockets: any = null;
    @Input() urlPresent: any = '';
    @Input() ctrlNavigation: number = 0;
    @Output() dataBalance = new EventEmitter<[]>();
    @Input() pocket: any = '';
    @Input() listVaultLength: boolean = false;
    @Input() navigationHistory: boolean;
    @Input() navigationExchange: boolean;
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
        private platform: Platform,
        private iab: InAppBrowser,
        private translateService: TranslateService,
        private socket: SocketIoService,
    ) {
        this.classLeft = "resize-logo-left1";
        this.imgLeft = "../../assets/img/btn-left-s.svg";
        this.imgRight = "../../assets/img/btn-right.svg";
    }

    async ngOnInit() {}

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
            componentProps: {
                pockets: this.pockets
            }
        });

        modalPocket.onDidDismiss().then(async (pocket: OverlayEventDetail) => {
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
                console.log("POKER TRIN :",this.pocket);
                this.store.setDataLocal('selected-pocket', this.pocket);
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
            this.animationTabs('receiveCash')
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
            this.animationTabs('sendCash')
        }

    }

    animationTabs(idTab) {
        let interval = setInterval(() => {
            this.margins[idTab] = this.margins[idTab] + 1;
            if (this.margins[idTab] == 0) {
                setTimeout(() => {
                    let intervalClose = setInterval(() => {
                        this.margins[idTab] = this.margins[idTab] - 1;
                        if (this.margins[idTab] == -65) {
                            this.counters[idTab] = 0;
                            clearInterval(intervalClose)
                        }
                    },30);
                }, 2000);
                clearInterval(interval)
            }
        }, 2)
    }

    async goToHome() {
        await this.router.navigate(['/app/tabs/dashboard']);
    }

    async presentAlert() {
        if (this.counters.logOut == 1) {
            const alert = await this.alertCtrl.create({
                header: 'Cerrar Sesión',
                message: '¿Desea cerrar su sesión?',
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    },
                    {
                        text: 'Confirmar',
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
            this.animationTabs('logOut')
        }
    }

    async logOut() {
        await this.loadingCtrl.present({});
        this.socket.disconnectSocket();
        await this.auth.logout();
    }

    openUrl(data?: string) {
        if (this.counters.qualify == 1) {
            let url: string;
            if (data) {
                url = data
            } else {
                let platform: any = this.platform.ready();
                platform == 'ios' ? url = 'https://apps.apple.com/us/app/eyewallet/id1338756423?l=es&ls=1' : url = 'https://play.google.com/store/apps/details?id=com.eyewallet.io'
            }
            const browser = this.iab.create(url, '_blank');
        } else {
            this.counters.qualify = 1;
            this.animationTabs('qualify')
        }
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

    public goHistoryExchange(): void {
        this.router.navigate(['/app/tabs/history-exchange']);
    }

    public goCreateExchange(): void {
        this.router.navigate(['/app/tabs/exchange']);
    }
}

