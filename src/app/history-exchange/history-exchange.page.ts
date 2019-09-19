import { Component, OnDestroy, OnInit } from '@angular/core';
import { AxiosService } from "../services/axios/axios.service";
import { AuthService } from "../services/auth/auth.service";
import { AesJsService } from "../services/aesjs/aes-js.service";
import { Storage } from "@ionic/storage";
import { LoadingService } from "../services/loading/loading.service";
import { TranslateService } from '@ngx-translate/core';
import * as CONSTANTS from '../constanst';

interface onEnter {
    onEnter(): Promise<void>;
}

@Component({
    selector: 'app-history-exchange',
    templateUrl: './history-exchange.page.html',
    styleUrls: ['./history-exchange.page.scss'],
})

export class HistoryExchangePage implements OnInit, OnDestroy, onEnter {
    public nameTypeSliding: any;
    public detailHistory: any;
    public ctrlAccessDetailHistory = 0;
    public ctrlTagsHtml = false;
    public ctrlCssCard: any = '';
    public historyExChange: any;
    public status = 2;
    public cryptoCurrency: any = [];
    public auxHisotires: any;
    public statusExchange = [
        {text: 'Rechazado', value: 0},
        {text: 'En proceso', value: 1},
        {text: 'Aprobado', value: 2},
        {text: 'Realizado', value: 3},
    ];
    public statusSelected: any;
    public cryptoSelected: any;
    public exchangeStatus: any[];

    constructor(
        private http: AxiosService,
        protected auth: AuthService,
        protected aesjs: AesJsService,
        protected store: Storage,
        private loadingCtrl: LoadingService,
        private translateService: TranslateService
    ) {
        this.nameTypeSliding = CONSTANTS.NAMES_SLIDING.EXCHANGE_HISTORY_SLIDING;
        this.exchangeStatus = this.setExchangeStatus();
    }

    private setExchangeStatus(): any[] {
        return [
            this.translateService.instant('EXCHANGE_HISTORY.Rejected'),
            this.translateService.instant('EXCHANGE_HISTORY.InProcess'),
            this.translateService.instant('EXCHANGE_HISTORY.Approved'),
            this.translateService.instant('EXCHANGE_HISTORY.Success'),
        ]
    }

    async ngOnInit() {
        await this.createSelectCrypto();
    }

    public async ionViewDidEnter(): Promise<any> {
        await this.getHistoryExChange()
    }

    async getHistoryExChange() {
        await this.loadingCtrl.present({text: 'Cargando historial', cssClass: 'textLoadingBlack'})
        let profile = this.aesjs.decrypt(await this.store.get('profile'));
        let response = await this.http.post('exchange/index', {userId: profile.userId}, this.auth);
        if (response.status === 200) {
            this.historyExChange = response.data;
            this.setClassShowDetails(this.historyExChange);
            this.historyExChange.forEach(history => {
                history.date =   new Date(history.createdAt).getMonth()  + "-" + new Date(history.createdAt).getDate()
                history.day = new Date(history.createdAt)
                history.hour = new Date(history.createdAt).getHours()  + "-" +  new Date(history.createdAt).getMinutes()
                history.amount = parseFloat(history.amount).toFixed(4)
                history.amountReceived = parseFloat(history.amountReceived).toFixed(4)
                history.data = JSON.parse(history.data)
                history.status === 1 ? history.state = 'En proceso' : history.status === 2 ? history.state = 'Aprobado' : history.status === 3 ? history.state = 'Realizado' : history.state = 'Rechazado'
            });
            this.auxHisotires = this.historyExChange
            await this.loadingCtrl.dismiss()
        } else {
            await this.loadingCtrl.dismiss()
        }
    }

    private setClassShowDetails(historyExchange: any): void {
        historyExchange.forEach(exchange => {
            exchange.classShowDetails = false;
        });
    }

    async createSelectCrypto() {
        let pockets = this.aesjs.decrypt(await this.store.get('pockets'));
        pockets.forEach(pocket => {
            const resultFrom = this.cryptoCurrency.find(data => data.currencyId === pocket.currencyId);
            if (resultFrom == undefined) this.cryptoCurrency.push(pocket)
        });
        this.cryptoSelected = this.cryptoCurrency[0].currency.shortName
    }

    filterSearch(value) {
        if (value === "") {
            this.historyExChange = this.auxHisotires
        } else {
            let histories = [];
            this.auxHisotires.forEach(history => {
                if (history.currencyShortNameFrom === this.cryptoSelected) {
                    if (history.amount >= parseFloat(value)) histories.push(history)
                }
            });
            this.historyExChange = histories
        }
    }

    clearData() {
        this.historyExChange = this.auxHisotires
    }

    filterWhitStatus() {
        this.historyExChange = this.auxHisotires;
        let histories = [];
        this.historyExChange.forEach(history => {
            if (history.status === this.statusSelected) {
                histories.push(history)
            }
        });
        this.historyExChange = histories
    }

    public seeDetailHistory(index: any): void {
        for (let i=0; i<this.historyExChange.length; i++) {
            if (i === index) {
                this.historyExChange[i].classShowDetails = !this.historyExChange[i].classShowDetails;
            } else {
                this.historyExChange[i].classShowDetails = false;
            }
        }
    }

    public async onEnter(): Promise<void> {
        console.log('siempre inicia')
    }

    public ngOnDestroy(): void {
        console.log('se cierra siempre')
    }
}
