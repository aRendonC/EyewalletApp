import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AxiosService} from "../../services/axios/axios.service";
import { AlertController, ModalController, Platform, ActionSheetController } from '@ionic/angular';
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
import * as CONSTANTS from '../../constanst';
import { TypeSliding } from '../../interfaces/index';

@Component({
    selector: 'app-pocket',
    templateUrl: './pocket.component.html',
    styleUrls: ['./pocket.component.scss'],
})

export class PocketComponent implements OnInit {
//===========================================================================//
    @Input() typeSliding: TypeSliding;
    @Input() titleTypeSliding: string;
    @Input() buttonLeft: boolean;
    @Input() buttonRight: boolean;
    public count: number;
//===========================================================================//
    public counters = {
        sendCash: 0,
        receiveCash: 0,
        qualify: 0,
        logOut: 0
    };
    public margins = {
        sendCash: -68,
        receiveCash: -68,
        qualify: -68,
        logOut: -68
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
        private actionSheetController: ActionSheetController
    ) {
//===========================================================================//
        this.count = 0;
//===========================================================================//
        this.classLeft = "resize-logo-left1";
        this.imgLeft = "../../assets/img/btn-left-s.svg";
        this.imgRight = "../../assets/img/btn-right.svg";
    }
//===========================================================================//
    public slidingLeft(event: any): void {
        if (event.detail.amount < -70) {
            this.validationFunctionExecute(CONSTANTS.NAMES_SLIDING.LEFT_LOCATION);
        }
    }

    public slidingRight(event: any): void {
        if (event.detail.amount > 70) {
            this.validationFunctionExecute(CONSTANTS.NAMES_SLIDING.RIGHT_LOCATION);
        }
    }

    private validationFunctionExecute(location): void {
        switch (this.typeSliding.id) {
            case CONSTANTS.NAMES_SLIDING.DASHBOARD_SLIDING.id:
                this.validateFunctionExecuteDashboard(location);
                break;
            case CONSTANTS.NAMES_SLIDING.RECEIVE_FUNDS_SLIDING.id:
                this.navigateToDashboard();
                break;
            case CONSTANTS.NAMES_SLIDING.PROFILE_SLIDING.id:
                this.navigateFunctionExecuteProfile(location);
                break;
            default:
                console.error('ERROR: ', this.translateService.instant('POCKET_COMPONENT.FunctionErroExecute'));
                break;
        }
    }

    private validateFunctionExecuteDashboard(location: string): void {
        if (location === CONSTANTS.NAMES_SLIDING.LEFT_LOCATION) {
            this.navigateToReceiveFunds();
        } else if (location === CONSTANTS.NAMES_SLIDING.RIGHT_LOCATION) {
            this.navigateToSendFunds();
        }
    }

    private async navigateToReceiveFunds(): Promise<any> {
        this.router.navigate(['/receive-funds'], {
            queryParams: {
                pocket: JSON.stringify(await this.store.getDataLocal('selected-pocket'))
            }, queryParamsHandling: 'merge'
        });
    }

    private async navigateToSendFunds(): Promise<any> {
        const profile = await this.store.getDataLocal('profile');
        if (profile.level === 0) {
            await this.toastCtrl.presentToast({text: this.translateService.instant('TOAST_MSG.DocumentsNoVerified')})
        } else {
            await this.router.navigate(['/send-currency', {pocket: JSON.stringify(await this.store.getDataLocal('selected-pocket'))}]);
        }
    }

    private navigateToDashboard(): void {
        this.router.navigate(['/app/tabs/dashboard']);
    }

    private navigateFunctionExecuteProfile(location: string): void {
        if (location === CONSTANTS.NAMES_SLIDING.LEFT_LOCATION) {
            this.navigateToCalification();
        } else if (location === CONSTANTS.NAMES_SLIDING.RIGHT_LOCATION) {
            this.executeCloseSession();
        }
    }

    private navigateToCalification(): void {
        let url: string = '';
        const urlIos: string = 'https://apps.apple.com/us/app/eyewallet/id1338756423?l=es&ls=1';
        const urlMd: string = 'https://play.google.com/store/apps/details?id=com.eyewallet.io';
        const platform: any = this.platform.ready();
        platform == 'ios' ? url = urlIos : url = urlMd;
        this.iab.create(url, '_blank');
    }

    private async executeCloseSession(): Promise<any> {
        await this.logOut();
        
        // this.count++;
        // console.log('COUNT: ', this.count);
        // if (this.count === 1) {
        //     const alert = await this.alertCtrl.create({
        //         header: 'Cerrar Sesión',
        //         message: '¿Desea cerrar su sesión?',
        //         buttons: [
        //             {
        //                 text: 'Cancelar',
        //                 role: 'cancel',
        //                 handler: () => {
        //                     console.log('Confirm Cancel');
        //                 }
        //             },
        //             {
        //                 text: 'Confirmar',
        //                 handler: async () => {
        //                     await this.logOut();
        //                     await this.toastCtrl.presentToast({text: this.translateService.instant('GENERAL.LogOutOk')});
        //                 }
        //             }
        //         ]
        //     });
        //     await alert.present();
        //     this.count = 0;
        //     return;
        // }

        // const actionSheet = await this.actionSheetController.create({
        //     header: 'Albums',
        //     buttons: [{
        //       text: 'Delete',
        //       role: 'destructive',
        //       icon: 'trash',
        //       handler: () => {
        //         console.log('Delete clicked');
        //       }
        //     }, {
        //       text: 'Share',
        //       icon: 'share',
        //       handler: () => {
        //         console.log('Share clicked');
        //       }
        //     }, {
        //       text: 'Play (open modal)',
        //       icon: 'arrow-dropright-circle',
        //       handler: () => {
        //         console.log('Play clicked');
        //       }
        //     }, {
        //       text: 'Favorite',
        //       icon: 'heart',
        //       handler: () => {
        //         console.log('Favorite clicked');
        //       }
        //     }, {
        //       text: 'Cancel',
        //       icon: 'close',
        //       role: 'cancel',
        //       handler: () => {
        //         console.log('Cancel clicked');
        //       }
        //     }]
        //   });
        //   await actionSheet.present();
    }
//===========================================================================//

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
                        if (this.margins[idTab] == -68) {
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
                        role: 'cancel',
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

<<<<<<< HEAD
    async logOut() {
        this.endlogout(await this.store.getDataLocal('chanelSocket'));
        await this.loadingCtrl.present({});
=======
    private async logOut(): Promise<any> {
        await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
>>>>>>> Refactorin of taba sliding is inited.
        this.socket.disconnectSocket();
        await this.auth.logout();
        //this.clickButtonLeftSeis();
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

    async endlogout(valorChannel){
        console.log("firulais", valorChannel);
       
        const response = await this.http.post('auth/logout', { channel: valorChannel }, this.auth);
        console.log('asdfadsfasdf', response);
    }
}

