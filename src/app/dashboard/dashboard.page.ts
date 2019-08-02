import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {DataLocalService} from '../services/data-local/data-local.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {SlidersComponent} from '../components/sliders/sliders.component';
import {LoadingService} from '../services/loading/loading.service';
import {filter} from 'rxjs/operators';
import {ToastService} from "../services/toast/toast.service";
import {SocketIoService} from "../services/socketIo/socket-io.service";
import {ChartComponent} from "../components/chart/chart.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
    public ctrlCssBlur: boolean = false;
    @ViewChild(SlidersComponent) sliderComponent: SlidersComponent;
    @ViewChild(ChartComponent) chartComponent: ChartComponent;
    @Input() gra: SlidersComponent;
    ctrlNavigation = 0;
    location: any;
    transactionComponent: any;
    public pockets: any = null;
    public pocket: any;
    public profile: any;
    public params = {
        userId: null,
        type: null,
        wallet_id: null,
        movement: null,
        limit: null
    };
    public crypto: any = [{
        graphic: ''
    }];

    constructor(
        private route: ActivatedRoute,
        private modalCtrl: ModalController,
        private storage: DataLocalService,
        private http: AxiosService,
        private auth: AuthService,
        private store: Storage,
        protected aesjs: AesJsService,
        public loadingController: LoadingService,
        private router: Router,
        private toastCtrl: ToastService,
        private socket: SocketIoService
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((route: NavigationStart) => {
            this.getTransactionsSend();
        });
    }

    async ngOnInit() {
        await this.socket.initSocketConnection();
        // await this.socket.disconnectSocket();
        this.pocket = this.aesjs.decrypt(await this.store.get('selected-pocket'));
        await this.getUserProfile();
        await this.getListTransactions();
    }

    ionViewDidEnter() {
        let elementDashboard: any = document.getElementsByTagName('app-dashboard');
        elementDashboard[0].classList.add("margins-dashboard")
    }

    async getTransactionsSend() {
        let transaction = await this.store.get('transaction');
        if (transaction) {
            await this.getDataPocket(transaction);
            await this.store.remove('transaction')
        }
    }

    public async getDataPocket(data: any) {
        console.log(data);
        this.crypto.forEach(crypto => {
            crypto.graphic = [];
            crypto.value = data.pocket.balance;
            crypto.valueUsd = data.btc.toFixed(8);
            if (data.data[0]) {
                data.data.forEach(elementGraphic => {
                    crypto.graphic.push(parseFloat(elementGraphic.balance_after));
                });
            } else {
                crypto.graphic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            }
        });
        this.crypto.value = data.pocket.balance
        this.crypto.valueUsd = data.btc
        this.crypto.shortName = data.pocket.currency.shortName;
        this.crypto.amountPending = data.amountPending;
        await this.getTransactionHistory(data);
        await this.sliderComponent.grafica();
    }

    async getTransactionHistory(data: any) {
        this.transactionComponent = data.data;
        const btc = data.btc;
        this.transactionComponent.forEach(element => {
            const amountFinal = element.amount_finally;
            const amountDollar = (amountFinal * btc).toFixed(2);
            const time = element.date_transaction.slice(11, 16);
            const dateFormat = `${element.date_transaction.slice(8, 10)}.${element.date_transaction.slice(5, 7)}.${element.date_transaction.slice(2, 4)}`;
            if (element.confirmation >= 0 && element.confirmation <= 2) {
                const confirmationText = 'Confirmando';
                Object.assign(element, {confirmationText});
            } else {
                const confirmationText = 'Confirmado';
                Object.assign(element, {confirmationText});
            }
            if (element.type === 1) {
                const plusMinus = '-';
                const typeIcon = '../../assets/img/balanceComponent/sent-icon.svg';
                Object.assign(element, {typeIcon});
                Object.assign(element, {plusMinus});
            } else if (element.type === 0) {
                const typeIcon = '../../assets/img/balanceComponent/receive-icon.svg';
                const plusMinus = '+';
                Object.assign(element, {typeIcon});
                Object.assign(element, {plusMinus});
            }
            Object.assign(element, {time});
            Object.assign(element, {dateFormat});
            Object.assign(element, {amountDollar});
        });
    }

    async getUserProfile() {
        let profile = await this.store.get('profile');
        profile = await this.aesjs.decrypt(profile);
        this.profile = profile;
        this.params.userId = profile.userId;
        this.params.type = 4;
        if (!this.pockets) {
            this.pockets = await this.store.get('pockets');
            if (this.pockets) {
                this.pockets = this.aesjs.decrypt(this.pockets)
            }
        }
    }

    async getListTransactions() {
        this.crypto = [];
        await this.loadingController.present({text: 'Recopilando información', cssClass: 'textLoadingBlack'});
        this.ctrlCssBlur = true;
        console.log(this.pockets)
        let params = {
            userId: this.profile.userId,
            type: 0,
            address: this.pockets[0].address,
            currencyShortName: this.pockets[0].currency.shortName
        };
        let response = await this.http.post('transaction/index', params, this.auth);
        let dataTransaction = response.data;
        if (dataTransaction[0]) {
            await this.getTransactionHistory(response);
            this.pockets.forEach(pocket => {
                if (!this.crypto[0]) {
                    this.crypto.push({
                        value: pocket.balance,
                        valueUsd: response.btc.toFixed(8),
                        background: pocket.currency.name,
                        name: pocket.currency.name,
                        pocketName: pocket.label,
                        currencyId: pocket.currencyId,
                        shortName: pocket.currency.shortName,
                        graphic: []
                    });
                } else {
                    const result = this.crypto.find(data => data.currencyId === pocket.currencyId);
                    if (result == undefined) {
                        this.crypto.push({
                            value: pocket.balance,
                            valueUsd: response.btc.toFixed(8),
                            background: pocket.currency.name,
                            name: pocket.currency.name,
                            pocketName: pocket.label,
                            currencyId: pocket.currencyId,
                            shortName: pocket.currency.shortName,
                            graphic: []
                        });
                    }
                }
            });
            dataTransaction.forEach(transactions => {
                this.crypto[0].graphic.push(transactions.balance_after)
            });
            this.crypto.value = this.pockets[0].balance
            this.crypto.valueUsd = this.pockets[0].valueUsd
            this.crypto.shortName = this.pockets[0].currency.shortName;
            this.crypto.amountPending = response.amountPending;

        } else {
            this.pockets.forEach(pocket => {
                this.crypto.push({
                    value: pocket.balance,
                    valueUsd: response.btc.toFixed(8),
                    background: pocket.currency.name,
                    name: pocket.currency.name,
                    pocketName: pocket.label,
                    currencyId: pocket.currencyId,
                    shortName: pocket.currency.shortName,
                    graphic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                });
            });
            this.crypto.value = this.pockets[0].balance
            this.crypto.valueUsd = this.pockets[0].valueUsd
            this.crypto.shortName = this.pockets[0].currency.shortName;
            this.crypto.shortName = this.pockets[0].currency.shortName;
            this.crypto.amountPending = response.amountPending;
            // this.crypto[0].graphic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            // this.crypto[0].valueUsd = response.btc.toFixed(8)
        }
        await this.loadingController.dismiss();
        this.ctrlCssBlur = false;
    }

    async changeDataPocketSlider(cryptoData) {
        let selected_pocket = [];
        this.pockets.forEach(pocket => {
            if (pocket.currencyId === cryptoData.currencyId) {
                selected_pocket.push(pocket)
            }
        });
        this.pocket = selected_pocket[0];
        let body = {
            userId: this.pocket.userId,
            type: 0,
            address: this.pocket.address,
            currencyShortName: this.pocket.currency.shortName
        };
        let dataResponse = await this.http.post('transaction/index', body, this.auth);
        console.log('pocket cuando cambio el slider', this.pocket);
        if (dataResponse.status === 200) {
            dataResponse.pocket = this.pocket;
            await this.getDataPocket(dataResponse)
        } else {
            await this.toastCtrl.presentToast({text: dataResponse.error.msg})
        }
    }

    private getUserId(): any {
        return this.storage.getDataLocal('profile');
    }
}
