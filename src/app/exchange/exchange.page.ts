import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSelect} from "@ionic/angular";
import {AxiosService} from "../services/axios/axios.service";
import {AuthService} from "../services/auth/auth.service";
import {ToastService} from "../services/toast/toast.service";
import {LoadingService} from "../services/loading/loading.service";
import {DataLocalService} from "../services/data-local/data-local.service";

@Component({
    selector: 'app-exchange',
    templateUrl: './exchange.page.html',
    styleUrls: ['./exchange.page.scss'],
})

export class ExchangePage implements OnInit {
    @ViewChild('selectFrom') selectFrom: IonSelect;
    @ViewChild('selectTo') selectTo: IonSelect;
    public inputFrom: any;
    public inputTo: any;
    public pockets: any = '';
    public ctrlNavigation = 8;
    public selectCryptoFrom = [];
    public selectCryptoTo: any = [];
    public usdAmount: any;
    public priceBtc;
    public tipoCurre;
    public event1 = false;
    public event2 = false;
    public valueCryptoTo: any = 0.0;
    public valueUsdFrom = 0.0;
    public cryptoFrom = {
        currencyId: '',
        currency: {
            shortName: ''
        }
    };
    public cryptoTo: any = {
        currencyId: '',
        currency: {
            shortName: ''
        }
    };
    public pocketsFrom: any = [];
    public pocketsTo: any = [];
    public selectedPocketFrom: any = {
        label: '',
        currency: {
            shortName: ''
        }
    };
    public selectedPocketTo: any = {
        label: '',
        currency: {
            shortName: ''
        }
    };

    constructor(
        private store: DataLocalService,
        public cdr: ChangeDetectorRef,
        public alertCtrl: AlertController,
        public http: AxiosService,
        protected auth: AuthService,
        private toastCtrl: ToastService,
        private loadingCtrl: LoadingService
    ) {
        this.usdAmount = 0;
        this.inputFrom = 0;
        this.inputTo = 0;
    }

    async ngOnInit() {
        await this.fillCryptoSelect();
        await this.getPriceCriptoUsd();
    }

    async fillCryptoSelect() {
        this.pockets = await this.store.getDataLocal('pockets');
        this.pockets.forEach(pocket => {
            const resultFrom = this.selectCryptoFrom.find(data => data.currencyId === pocket.currencyId);
            if (resultFrom == undefined) this.selectCryptoFrom.push(pocket)
        });
        this.selectCryptoTo = this.selectCryptoFrom;
        this.cryptoFrom = this.selectCryptoFrom[0];
        this.cryptoTo = this.selectCryptoFrom[1];
        this.pockets.forEach(pocket => {
            if (pocket.currencyId === this.cryptoFrom.currencyId) {
                this.pocketsFrom.push(pocket)
            } else if (pocket.currencyId === this.cryptoTo.currencyId) {
                this.pocketsTo.push(pocket)
            }
        });
        this.selectedPocketFrom = this.pocketsFrom[0];
        this.selectedPocketTo = this.pocketsTo[0];
    }

    async filterCryptoSelectFrom() {
        let i = this.selectCryptoTo.indexOf(this.cryptoFrom);
        if (i !== -1) {
            this.selectCryptoTo.splice(i, 1);
        }
        this.cdr.detectChanges();
    }

    filterCryptoSelectTo(data) {
        this.selectCryptoTo.splice(data, 1);
    }

    createInputsDataPockets(pockets) {
        const theNewInputs = [];
        pockets.forEach(pocket => {
            theNewInputs.push(
                {
                    name: 'radio2',
                    type: 'radio',
                    label: pocket.label,
                    value: pocket
                }
            );
        });
        return theNewInputs;
    }

    createInputsDataCurrencyFrom(cryptoFrom) {
        
        const theNewInputs = [];
        cryptoFrom.forEach(crypto => {
            theNewInputs.push(
                {
                    name: 'radio2',
                    type: 'radio',
                    label: crypto.currency.shortName,
                    value: crypto
                }
            );
        });
        return theNewInputs;
    }

    async filterCurrencyFrom(cryptoFrom) {
        let dataCurrencyFrom = this.createInputsDataCurrencyFrom(cryptoFrom);
        const alert = await this.alertCtrl.create({
            header: 'Seleccione moneda 1',
            inputs: dataCurrencyFrom,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: async (data) => {
                        if (data) {
                            this.cryptoFrom = data;
                            this.selectedPocketFrom = data;
                            this.pocketsFrom = this.filterPockets(data);
                            await this.filterCurrencyTo(this.selectCryptoTo);
                            console.log('criptos a cambiar', this.selectCryptoTo);
                            this.tipoCurre = this.cryptoFrom.currency.shortName;
                            await this.getPriceCriptoUsd();
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    async filterCurrencyTo(cryptoTo) {
        let dataCurrencyTo = this.createInputsDataCurrencyFrom(cryptoTo);
        for( let i = 0; i < dataCurrencyTo.length; i++){
            if ( dataCurrencyTo[i].label === this.selectedPocketFrom.currency.shortName) {
                dataCurrencyTo.splice(i, 1);
                i--;
            }
        }
        const alert = await this.alertCtrl.create({
            header: 'Seleccione moneda 2',
            inputs: dataCurrencyTo,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        if (data) {
                            this.cryptoTo = data;
                            this.selectedPocketTo = data;
                            this.pocketsTo = this.filterPockets(data);
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

    async selectPocketFrom(pockets) {
        let dataPockets = this.createInputsDataPockets(pockets);
        const alert = await this.alertCtrl.create({
            header: 'Seleccione su pocket',
            inputs: dataPockets,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        if (data) this.selectedPocketFrom = data;
                    }
                }
            ]
        });
        await alert.present();
    }

    async selectPocketTo(pockets) {
        let dataPockets = this.createInputsDataPockets(pockets);
        const alert = await this.alertCtrl.create({
            header: 'Seleccione su pocket',
            inputs: dataPockets,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (data) => {
                        if (data) this.selectedPocketTo = data;
                    }
                }
            ]
        });
        await alert.present();
    }

    
    filterPockets(currency) {
        let pockets = [];
        this.pockets.forEach(pocket => {
            if (pocket.currencyId === currency.currencyId) {
                pockets.push(pocket)
            }
        });
        return pockets
    }

    async createExchange() {
        await this.loadingCtrl.present({text: 'Enviando solicitud', cssClass: 'textLoadingBlack'});
        let profile = await this.store.getDataLocal('profile');
        let body = {
            addressFrom: this.selectedPocketFrom.address,
            addressTo: this.selectedPocketTo.address,
            currencyIdFrom: this.selectedPocketFrom.currencyId,
            currencyIdTo: this.selectedPocketTo.currencyId,
            currencyShortNameFrom: this.selectedPocketFrom.currency.shortName,
            currencyShortNameTo: this.selectedPocketTo.currency.shortName,
            amount: this.inputFrom,
            userId: profile.userId,
            priority: "low"
        };
        if (this.selectedPocketFrom.balance >= 0.0001) {
            let responseExchange = await this.http.post('exchange/create', body, this.auth);
            if (responseExchange.status === 200) {
                await this.loadingCtrl.dismiss();
                await this.toastCtrl.presentToast({
                    text: 'Solicitud enviada correctamente'
                })
                let dataResponse = await this.getPocketTransaction();
                if (dataResponse.status === 200) {
                    dataResponse.pocket = this.selectedPocketFrom;
                    await this.store.setDataLocal('transaction', dataResponse)
                } else {
                    await this.toastCtrl.presentToast({text: dataResponse.error.msg})
                }
            } else {
                await this.loadingCtrl.dismiss();
                await this.toastCtrl.presentToast({
                    text: responseExchange.error.msg
                })
            }
        } else {
            await this.loadingCtrl.dismiss();
            await this.toastCtrl.presentToast({
                text: `Su pocket ${this.selectedPocketFrom.label} no tiene fondos suficientes`
            })
        }
    }

    changeCryptoData() {
        let selectedPocketFrom = this.selectedPocketFrom;
        let selectedPocketTo = this.selectedPocketTo;
        let selectCryptoTo = this.selectCryptoTo;
        let selectCryptoFrom = this.selectCryptoFrom;
        let cryptoFrom = this.cryptoFrom;
        let cryptoTo = this.cryptoTo;
        this.selectedPocketFrom = selectedPocketTo;
        this.selectedPocketTo = selectedPocketFrom;
        this.selectCryptoTo = selectCryptoFrom;
        this.selectCryptoFrom = selectCryptoTo;
        this.cryptoTo = cryptoFrom;
        this.cryptoFrom = cryptoTo
    }

    async getPricesExchange() {
        let body = {
            currencyShortNameFrom: this.selectedPocketFrom.currency.shortName,
            currencyShortNameTo: this.selectedPocketTo.currency.shortName,
            amount: this.inputFrom,
        };
        let response = await this.http.post('exchange/price', body, this.auth);
        this.inputTo = response.amountCriptoTo;
        this.valueUsdFrom = response.priceUsdFrom;
        this.valueCryptoTo = (response.priceUsdFrom / response.priceUsdTo).toFixed(5)
    }

    async getPocketTransaction() {
        let body = {
            userId: this.selectedPocketFrom.userId,
            type: 0,
            address: this.selectedPocketFrom.address,
            currencyShortName: this.selectedPocketFrom.currency.shortName
        };
        return await this.http.post('transaction/index', body, this.auth);
    }

    public async getFeeTransactionFrom(event): Promise<any> {
        this.usdAmount = (this.priceBtc * this.inputFrom).toFixed(2);
        await this.getPricesExchange();
    }

    public async onInput(event): Promise<any> {
        this.inputFrom = (this.usdAmount/this.priceBtc).toFixed(4);
        await this.getPricesExchange();
    }

    async getPriceCriptoUsd(){
        let curre = "";
        if (this.tipoCurre == null){
            curre = "BTC";
        }else{
            curre = this.tipoCurre;
        }
        let body = {
            amount: 0.0001,
            currencyShortNameFrom: curre,
            currencyIdFrom: this.cryptoFrom.currencyId
        };
        let responseFee = await this.http.post('exchange/fee', body, this.auth);
        if (responseFee.status === 200) {
            this.priceBtc = responseFee.data.priceCriptoUsd;
        }
    }
}
