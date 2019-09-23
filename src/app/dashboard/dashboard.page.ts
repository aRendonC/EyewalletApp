import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataLocalService } from '../services/data-local/data-local.service';
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { SlidersComponent } from '../components/sliders/sliders.component';
import { LoadingService } from '../services/loading/loading.service';
import { ToastService } from "../services/toast/toast.service";
import { ChartComponent } from "../components/chart/chart.component";
import { TranslateService } from "@ngx-translate/core";
import * as CONSTANTS from '../constanst';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
//===========================================================================//
    public nameTypeSliding: string;
    public titleTypeSliding: string;
//===========================================================================//
    @ViewChild(SlidersComponent) sliderComponent: SlidersComponent;
    @ViewChild(ChartComponent) chartComponent: ChartComponent;
    @Input() gra: SlidersComponent;
    public ctrlNavigation: number;
    public ctrlCssBlur: boolean;
    public pockets: any;
    public pocket: any;
    public location: any;
    public transactionComponent: any;
    public profile: any;
    public params: any = {
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
        private dataLocalService: DataLocalService,
        private axiosService: AxiosService,
        private authService: AuthService,
        private loadingController: LoadingService,
        private toastService: ToastService,
        private translateService: TranslateService
    ) {
        this.titleTypeSliding = 'name pocket';
        this.nameTypeSliding = CONSTANTS.NAMES_SLIDING.DASHBOARD_SLIDING
        this.ctrlNavigation = 0;
        this.ctrlCssBlur = false;
        this.pockets = null;
    }

    public async ngOnInit(): Promise<any> {}

    public async ionViewDidEnter(): Promise<any> {
        this.loadingController.present({text: this.translateService.instant('DASHBOARD_PAGE.LoadingInformation'), cssClass: 'textLoadingBlack'});
        await this.getDataStorage();
        await this.getListTransactions();
        await this.getTransactionsSend();
        let elementDashboard: any = document.getElementsByTagName('app-dashboard');
        elementDashboard[0].classList.add("margins-dashboard")
    }

    public async getDataStorage(): Promise<any> {
        this.pocket = await this.dataLocalService.getDataLocal('selected-pocket');
        this.profile = await this.dataLocalService.getDataLocal('profile');
        this.pockets = await this.dataLocalService.getDataLocal('pockets');
        console.log('dashboard', this.profile);
        this.params.userId = this.profile.userId;
        this.params.type = 4;
        console.log
    }

    async getTransactionsSend() {
        let transaction = await this.dataLocalService.getDataLocal('transaction');
        if (transaction) {
            await this.getDataPocket(transaction);
            await this.dataLocalService.removeKey('transaction');
        }
    }

    public async getDataPocket(data?: any) {
        let bool = await this.dataLocalService.getDataLocal('pocket-created');
        if (bool) {
            let pockets = await this.getPocketsList();
            await this.dataLocalService.setDataLocal('pockets', pockets);
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
            await this.dataLocalService.removeKey('pocket-created')

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
            const time = element.createdAt.slice(11, 16);
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

    async getListTransactions() {
        this.crypto = [];
        this.ctrlCssBlur = true;
        let params = {
            userId: this.profile.userId,
            type: 0,
            address: this.pockets[0].address,
            currencyShortName: this.pockets[0].currency.shortName
        };
        let response = await this.axiosService.post('transaction/index', params, this.authService);
        let dataTransaction = response.data;
        if (dataTransaction[0]) {
            await this.getTransactionHistory(response);
            this.pockets.forEach(pocket => {
                if (!this.crypto[0]) {
                    this.crypto.push({
                        value: pocket.balance,
                        id: pocket.id,
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
                            id: pocket.id,
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
                        id: pocket.id,
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
                            id: pocket.id,
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
            this.dataLocalService.setDataLocal('pockets', this.pockets.data)
            let pocketsNews = await this.axiosService.post('user-wallet/index', {currencyId: cryptoData.currencyId}, this.authService);
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
        
        let dataResponse = await this.axiosService.post('transaction/index', body, this.authService);
        this.dataLocalService.setDataLocal('selected-pocket', this.pocket);
        if (dataResponse.status === 200) {
            dataResponse.pocket = this.pocket;
            await this.getDataPocket(dataResponse)
        } else {
            await this.toastService.presentToast({text: dataResponse.error.msg})
        }
    }

    async refreshTransactions(dataTransaction): Promise<any> {
        await this.loadingController.dismiss();
        await this.getDataPocket(dataTransaction)
    }

    public async getPocketsList() {
        return await this.axiosService.post('user-wallet/index', {currencyId: ''}, this.authService);
    }
}
