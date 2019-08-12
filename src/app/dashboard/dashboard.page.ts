import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {DataLocalService} from '../services/data-local/data-local.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {SlidersComponent} from '../components/sliders/sliders.component';
import {LoadingService} from '../services/loading/loading.service';
import {ToastService} from "../services/toast/toast.service";
import {SocketIoService} from "../services/socketIo/socket-io.service";
import {ChartComponent} from "../components/chart/chart.component";
import {TranslateService} from "@ngx-translate/core";

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
        graphic: '',
        pocket: ''
    }];

    constructor(
        private route: ActivatedRoute,
        private modalCtrl: ModalController,
        private storage: DataLocalService,
        private http: AxiosService,
        private auth: AuthService,
        public loadingController: LoadingService,
        private router: Router,
        private toastCtrl: ToastService,
        private socket: SocketIoService,
        private translateService: TranslateService,
    ) {
    }

    async ngOnInit() {
        await this.loadingController.present({text: this.translateService.instant('DASHBOARD_PAGE.LoadingInformation'), cssClass: 'textLoadingBlack'});
        // await this.socket.initSocketConnection();
        // await this.socket.disconnectSocket();
        this.pocket = await this.storage.getDataLocal('selected-pocket');
        await this.getUserProfile();
        await this.getListTransactions();
    }

    public async ionViewDidEnter() {
        await this.getTransactionsSend();
        let elementDashboard: any = document.getElementsByTagName('app-dashboard');
        elementDashboard[0].classList.add("margins-dashboard")
    }

    async getTransactionsSend() {
        let transaction = await this.storage.getDataLocal('transaction');
        if (transaction) {
            await this.getDataPocket(transaction);
            await this.storage.removeKey('transaction')
        }
    }

    public async getDataPocket(data?: any) {
        let bool = await this.storage.getDataLocal('pocket-created');
        if (bool) {
            let pockets = await this.getPocketsList();
            await this.storage.setDataLocal('pockets', pockets);
            pockets.forEach(pocket => {
                if (!this.crypto[0]) {
                    this.crypto.push({
                        value: pocket.balance,
                        valueUsd: data.btc.toFixed(8),
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
                            valueUsd: data.btc.toFixed(8),
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
            this.crypto.forEach(crypto => {
                crypto.graphic = [];
                crypto.value = data.pocket.balance;

                crypto.valueUsd = data.btc.toFixed(8);
                if (data.data[0]) {
                    data.data.forEach(elementGraphic => {
                        crypto.graphic.unshift(parseFloat(elementGraphic.balance_after));
                    });
                } else {
                    crypto.graphic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }
            });
            setTimeout(async () => {
                await this.sliderComponent.changeSlides(this.crypto.length + 1)
            }, 1000)
            await this.storage.removeKey('pocket-created')

        } else {
            this.crypto.forEach(crypto => {
                crypto.graphic = [];
                crypto.value = data.pocket.balance;

                crypto.valueUsd = data.btc.toFixed(8);
                if (data.data[0]) {
                    data.data.forEach(elementGraphic => {
                        crypto.graphic.unshift(parseFloat(elementGraphic.balance_after));
                    });
                } else {
                    crypto.graphic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                }
            });
        }
        this.crypto.value = data.pocket.balance;
        this.crypto.valueUsd = data.btc;
        this.crypto.pocketName = data.pocket.label;
        this.crypto.shortName = data.pocket.currency.shortName;
        this.crypto.amountPending = data.amountPending;
        await this.getTransactionHistory(data);
        await this.sliderComponent.grafica();
    }

    async getTransactionHistory(data?: any): Promise<any> {
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
        let profile = await this.storage.getDataLocal('profile');
        this.profile = profile;
        this.params.userId = profile.userId;
        this.params.type = 4;
        if (!this.pockets) {
            this.pockets = await this.storage.getDataLocal('pockets');
        }
    }

    async getListTransactions() {
        this.crypto = [];
        this.ctrlCssBlur = true;
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
                this.crypto[0].graphic.unshift(transactions.balance_after)
            });
            this.crypto.value = this.pockets[0].balance;
            this.crypto.valueUsd = this.pockets[0].valueUsd;
            this.crypto.shortName = this.pockets[0].currency.shortName;
            this.crypto.amountPending = response.amountPending;

        } else {
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

                        graphic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

                            graphic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        });
                    }
                }
            });
            this.crypto.value = this.pockets[0].balance;
            this.crypto.valueUsd = this.pockets[0].valueUsd;
            this.crypto.shortName = this.pockets[0].currency.shortName;
            this.crypto.amountPending = response.amountPending;
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
        if (!selected_pocket[0]) {
            this.pockets = await  this.getPocketsList()
            this.storage.setDataLocal('pockets', this.pockets.data)
            let pocketsNews = await this.http.post('user-wallet/index', {currencyId: cryptoData.currencyId}, this.auth);
            this.pocket = pocketsNews[0]
        } else {
            this.pocket = selected_pocket[0];
        }
        let body = {
            userId: this.pocket.userId,
            type: 0,
            address: this.pocket.address,
            currencyShortName: this.pocket.currency.shortName
        };
        let dataResponse = await this.http.post('transaction/index', body, this.auth);
        this.storage.setDataLocal('selected-pocket', this.pocket);
        if (dataResponse.status === 200) {
            dataResponse.pocket = this.pocket;
            await this.getDataPocket(dataResponse)
        } else {
            await this.toastCtrl.presentToast({text: dataResponse.error.msg})
        }
    }

    async refreshTransactions(dataTransaction): Promise<any> {
        await this.loadingController.dismiss();
        await this.getDataPocket(dataTransaction)

    }

    public async getPocketsList() {
        return await this.http.post('user-wallet/index', {currencyId: ''}, this.auth);
    }

}

