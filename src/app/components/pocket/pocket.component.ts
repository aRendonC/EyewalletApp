import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AxiosService } from "../../services/axios/axios.service";
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ListPocketsPage } from "../../list-pockets/list-pockets.page";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { LoadingService } from "../../services/loading/loading.service";
import { ToastService } from "../../services/toast/toast.service";
import { DataLocalService } from "../../services/data-local/data-local.service";
import { OverlayEventDetail } from '@ionic/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from "@ngx-translate/core";
import { SocketIoService } from 'src/app/services/socketIo/socket-io.service';
import * as CONSTANTS from '../../constanst';
import { TypeSliding } from '../../interfaces/index';

@Component({
    selector: 'app-pocket',
    templateUrl: './pocket.component.html',
    styleUrls: ['./pocket.component.scss'],
})

export class PocketComponent implements OnInit {
    @Input() typeSliding: TypeSliding;
    @Input() titleTypeSliding: string;
    @Input() buttonLeft: boolean;
    @Input() buttonRight: boolean;
    public countLogOut: number;
    @Output() dataBalance = new EventEmitter<[]>();
    @Input() pocket: any = '';
    public pockets: any;

    public constructor(
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
        private socket: SocketIoService
    ) {
        this.countLogOut = 0;
        this.pockets = null;
    }

    public ngOnInit(): void {}
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
                this.router.navigate(['/app/tabs/dashboard']);
                break;
            case CONSTANTS.NAMES_SLIDING.PROFILE_SLIDING.id:
                this.validateFunctionExecuteProfile(location);
                break;
            case CONSTANTS.NAMES_SLIDING.PRICES_SLIDING.id:
                this.iab.create('https://www.criptonoticias.com', '_blank');
                break;
            case CONSTANTS.NAMES_SLIDING.VAULT_SLIDING.id:
                this.router.navigate(['/app/tabs/vault-list']);
                break;
            case CONSTANTS.NAMES_SLIDING.VAULT_LIST_SLIDING.id:
                this.router.navigate(['/app/tabs/vault']);
                break;
            case CONSTANTS.NAMES_SLIDING.VAULT_CREATE_SLIDING.id:
                this.router.navigate(['/app/tabs/vault']);
                break;
            case CONSTANTS.NAMES_SLIDING.EXCHANGE_CREATE_SLIDING.id:
                this.router.navigate(['/app/tabs/history-exchange']);
                break;
            case CONSTANTS.NAMES_SLIDING.EXCHANGE_HISTORY_SLIDING.id:
                this.router.navigate(['/app/tabs/exchange']);
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

    private validateFunctionExecuteProfile(location: string): void {
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
        this.countLogOut++;
        if (this.countLogOut === 1) {
            const alert = await this.alertCtrl.create({
                header: this.translateService.instant('POCKETS_COMPONENT.TitleAlertCloseSession'),
                message: this.translateService.instant('POCKETS_COMPONENT.MessageCloseSession'),
                buttons: [
                    {
                        text: this.translateService.instant('POCKETS_COMPONENT.ButtonCancelCloseSession'),
                        role: 'cancel',
                        handler: () => {
                            console.log('Confirm Cancel');
                        }
                    },
                    {
                        text: this.translateService.instant('POCKETS_COMPONENT.ButtonConfirmCloseSession'),
                        handler: async () => {
                            await this.logOut();
                            await this.toastCtrl.presentToast({text: this.translateService.instant('GENERAL.LogOutOk')});
                        }
                    }
                ]
            });
            await alert.present();
            this.countLogOut = 0;
            return;
        }
    }

    private async logOut(): Promise<any> {
        await this.loadingCtrl.present({text: this.translateService.instant('POCKETS_COMPONENT.MessageClosingSession'), cssClass: 'textLoadingBlack'});
        await this.http.post('auth/logout', { channel: await this.store.getDataLocal('chanelSocket') }, this.auth);
        this.socket.disconnectSocket();
        await this.auth.logout();
    }

    public async openPocketsModal(): Promise<any> {
        if (!this.pocket) this.pocket = await this.getPocketStore();
        if (this.typeSliding.id === CONSTANTS.NAMES_SLIDING.DASHBOARD_SLIDING.id) {
            await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
            this.pockets = await this.http.post('user-wallet/index', {currencyId: this.pocket.currencyId}, this.auth);
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
                    this.store.setDataLocal('selected-pocket', this.pocket);
                    await this.loadingCtrl.present({cssClass: 'textLoadingBlack'});
                    let dataResponse = await this.http.post('transaction/index', body, this.auth);
                    if (dataResponse.status === 200) {
                        await this.loadingCtrl.dismiss();
                        dataResponse.pocket = this.pocket;
                        this.dataBalance.emit(dataResponse);
                    } else {
                        await this.toastCtrl.presentToast({text: dataResponse.error.msg})
                    }
                }
    
            });
            await this.loadingCtrl.dismiss();
            return await modalPocket.present();
        }
    }

    private async getPocketStore(): Promise<any> {
        return this.pocket = await this.store.getDataLocal('selected-pocket');
    }
}

