import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../services/axios/axios.service";
import {AuthService} from "../services/auth/auth.service";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {Storage} from "@ionic/storage";
import {filter} from "rxjs/operators";
import {NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-history-exchange',
    templateUrl: './history-exchange.page.html',
    styleUrls: ['./history-exchange.page.scss'],
})
export class HistoryExchangePage implements OnInit {
    ctrlNavigation: any = 6;
    public detailHistory: any;
    public ctrlAccessDetailHistory = 0;
    public ctrlTagsHtml = false;
    public ctrlCssCard: any = '';
    public historyExChange = [];
    public status = 2;
    public cryptoCurrency: any = [];
    public auxHisotires: any;
    public statusExchange = [
        {text: 'Rechazado', value: 0},
        {text: 'En proceso', value: 1},
        {text: 'Aprobado', value: 2}
    ];
    public statusSelected: any;
    public cryptoSelected: any;

    constructor(
        private http: AxiosService,
        protected auth: AuthService,
        protected aesjs: AesJsService,
        protected store: Storage,
        private router: Router
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((route: NavigationStart) => {
            console.log(route);
            if(route.url === '/app/tabs/history-exchange') this.getHistoryExChange()
        });

    }

    async ngOnInit() {
        await this.createSelectCrypto();
        // await this.getHistoryExChange();
        // this.statusSelected = this.statusExchange[2].text;
        // this.historyExChange = [
        //     {
        //         pocket: 'Pocket 1',
        //         exchange: 'Exchange',
        //         FROM: 'BTC',
        //         fromValue: 0.115,
        //         TO: 'ETH',
        //         toValue: 3.258,
        //         status: 0
        //     },
        //     {
        //         pocket: 'Pocket 2',
        //         exchange: 'Exchange',
        //         FROM: 'BTC',
        //         fromValue: 0.235,
        //         TO: 'ETH',
        //         toValue: 58.258,
        //         status: 1
        //     },
        //     {
        //         pocket: 'Pocket 3',
        //         exchange: 'Exchange',
        //         FROM: 'ETH',
        //         fromValue: 1.15,
        //         TO: 'BTC',
        //         toValue: 14.258,
        //         status: 2
        //     },
        //     {
        //         pocket: 'Pocket 4',
        //         exchange: 'Exchange',
        //         FROM: 'LTC',
        //         fromValue: 1442.15,
        //         TO: 'BTC',
        //         toValue: 14.258,
        //         status: 2
        //     }
        // ];
        console.log(this.historyExChange);
    }

    async getHistoryExChange() {
        let profile = this.aesjs.decrypt(await this.store.get('profile'));
        let response = await this.http.post('exchange/index', {userId: profile.userId}, this.auth);
        console.log(response);
        if (response.status === 200) {
            this.historyExChange = response.data;
            console.log(this.historyExChange);
            this.historyExChange.forEach(histry => {
                histry.status === 1 ? histry.state = 'En proceso' : histry.status === 2 ? histry.state = 'Aprobado' : histry.state = 'Rechazado'
            });
            this.auxHisotires = this.historyExChange
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
        if (value === "") {
            this.historyExChange = this.auxHisotires
        } else {
            let histories = [];
            this.historyExChange.forEach(history => {
                console.log(typeof history.fromValue);
                if (history.FROM === this.cryptoSelected) {
                    if (history.fromValue >= parseFloat(value)) histories.push(history)
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
        if(this.ctrlAccessDetailHistory === 1) {
            if(this.ctrlCssCard === index){
            console.log('mostrar el datalle de la historia');
            this.ctrlTagsHtml = true;
            this.ctrlAccessDetailHistory = 0;
            this.detailHistory = history
            }
        } else {
            this.ctrlAccessDetailHistory = 1
        }

        if(this.ctrlCssCard === index) {
            this.ctrlCssCard = ''
        } else {
            this.ctrlCssCard = index
        }

    }
}
