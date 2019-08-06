import {Component, OnDestroy, OnInit} from '@angular/core';
import {AxiosService} from "../services/axios/axios.service";
import {AuthService} from "../services/auth/auth.service";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {Storage} from "@ionic/storage";
import {filter} from "rxjs/operators";
import {NavigationStart, Router} from "@angular/router";
import {LoadingService} from "../services/loading/loading.service";

interface onEnter {
    onEnter(): Promise<void>;
}

@Component({
    selector: 'app-history-exchange',
    templateUrl: './history-exchange.page.html',
    styleUrls: ['./history-exchange.page.scss'],
})
export class HistoryExchangePage implements OnInit, OnDestroy, onEnter {
    ctrlNavigation: any = 8;
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

    constructor(
        private http: AxiosService,
        protected auth: AuthService,
        protected aesjs: AesJsService,
        protected store: Storage,
        private router: Router,
        private loadingCtrl: LoadingService
    ) {


    }

    public async ionViewDidEnter(): Promise<any> {
        await this.getHistoryExChange()
    }
    async ngOnInit() {
        await this.createSelectCrypto();
    }

    async getHistoryExChange() {
        await this.loadingCtrl.present({text: 'Cargando historial', cssClass: 'textLoadingBlack'})
        let profile = this.aesjs.decrypt(await this.store.get('profile'));
        let response = await this.http.post('exchange/index', {userId: profile.userId}, this.auth);

        if (response.status === 200) {
            this.historyExChange = response.data;
            console.log(this.historyExChange);
            this.historyExChange.forEach(history => {
                history.date =   new Date(history.createdAt).getMonth()  + "-" + new Date(history.createdAt).getDate()
                history.day = new Date(history.createdAt)
                // history.createdAt = history.createdAt.toISOString()
                history.hour = new Date(history.createdAt).getHours()  + "-" +  new Date(history.createdAt).getMinutes()
                history.amount = parseFloat(history.amount).toFixed(4)
                history.amountReceived = parseFloat(history.amountReceived).toFixed(4)
                history.data = JSON.parse(history.data)
                history.status === 1 ? history.state = 'En proceso' : history.status === 2 ? history.state = 'Aprobado' : history.status === 3 ? history.state = 'Realizado' : history.state = 'Rechazado'
            });
            console.log(this.historyExChange);
            this.auxHisotires = this.historyExChange
            await this.loadingCtrl.dismiss()
        } else {
            await this.loadingCtrl.dismiss()
        }
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
        console.log(this.cryptoSelected);
        console.log(value);
        console.log(this.auxHisotires);
        console.log(this.historyExChange);
        if (value === "") {
            this.historyExChange = this.auxHisotires
        } else {
            let histories = [];
            this.auxHisotires.forEach(history => {
                console.log(history.amount);
                if (history.currencyShortNameFrom === this.cryptoSelected) {
                    if (history.amount >= parseFloat(value)) histories.push(history)
                }
            });
            this.historyExChange = histories
        }
        console.log(this.historyExChange)
    }

    clearData() {
        this.historyExChange = this.auxHisotires
    }

    filterWhitStatus() {
        this.historyExChange = this.auxHisotires;
        let histories = [];
        console.log(this.statusSelected);
        this.historyExChange.forEach(history => {
            if (history.status === this.statusSelected) {
                histories.push(history)
            }
        });
        this.historyExChange = histories
    }

    seeDetailHistory(history: object, index) {
        console.log(history);
        console.log(index);
        if (this.ctrlAccessDetailHistory === 1) {
            if (this.ctrlCssCard === index) {
                console.log('mostrar el datalle de la historia');
                this.ctrlTagsHtml = true;
                this.ctrlAccessDetailHistory = 0;
                this.detailHistory = history
            }
        } else {
            this.ctrlAccessDetailHistory = 1
        }

        if (this.ctrlCssCard === index) {
            this.ctrlCssCard = ''
        } else {
            this.ctrlCssCard = index
        }

    }

    public async onEnter(): Promise<void> {
        console.log('siempre inicia')
    }

    public ngOnDestroy(): void {
        console.log('se cierra siempre')
    }


}
