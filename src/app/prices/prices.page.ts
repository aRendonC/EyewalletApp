import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Chart} from 'chart.js';
import {LoadingService} from '../services/loading/loading.service';
import {ToastService} from '../services/toast/toast.service';
import {environment} from '../../environments/environment';
import {DataLocalService} from "../services/data-local/data-local.service";
import {TranslateService} from "@ngx-translate/core";
import * as CONSTANTS from '../constanst';

@Component({
    selector: 'app-prices',
    templateUrl: './prices.page.html',
    styleUrls: ['./prices.page.scss'],
})

export class PricesPage implements OnInit {
    @Input() name: any;
    @ViewChild('lineCanvas') lineCanvas;
    public ctrlCssBlur = false;
    public lineChart: any;
    public cryptoPrices24h: any;
    public ctrlNavigation = 3;
    public prices24h = [];
    public ctrlCssColor = '';
    private dataUser: any;
    public bodyForm: any;
    public cardPrices = [];
    public urlFlags = environment.flag;
    public ctrlCssColorIndex = 0;
    public selectedCrypto: any;
    public cryptoCodes: any;
    public cryptoValue: any;

    public constructor(
        private axios: AxiosService,
        private auth: AuthService,
        private store: DataLocalService,
        private loading: LoadingService,
        private toastCtrl: ToastService,
        private translateService: TranslateService,
    ) {}

    public async ngOnInit(): Promise<any> {
        this.dataUser = await this.store.getDataLocal(CONSTANTS.KEYS_DATA_LOCAL.PROFILE);
        await this.getCryptoPrices24h();
    }

    private async getCryptoPrices24h(): Promise<any> {
        await this.loading.present({text: this.translateService.instant('PRICES_PAGE.LoadingCrypto'), cssClass: 'textLoadingBlack'});
        this.bodyForm = {
            userId: this.dataUser.userId,
        };
        this.cryptoPrices24h = await this.axios.post('transaction/historyBTC', this.bodyForm, this.auth);
        if (this.cryptoPrices24h.status === 200) {
            this.cryptoPrices24h = this.cryptoPrices24h.data;
        } else {
            await this.toastCtrl.presentToast({text: 'Hubo un error interno, por favor reinicie la aplicación e intentalo de nuevo. Si el problema persiste contactese con nuestro equipo de soporte.'});
        }
        let cryptos = [];
        this.cardPrices = this.cryptoPrices24h;
        this.cardPrices.forEach(crypto => {
            if (crypto.cryptoCodes === 'BTC' || crypto.cryptoCodes === 'ETH' ||
                crypto.cryptoCodes === 'BCH' || crypto.cryptoCodes === 'LTC' ||
                crypto.cryptoCodes === 'XMR' || crypto.cryptoCodes === 'ZEC') {
                cryptos.push(crypto)
            }
        });
        this.cardPrices = cryptos;
        this.cardPrices[0].cryptoClass = 'crypto-card BTC';
        this.cardPrices[0].fontClass = 'white';
        await this.loading.dismiss();
        this.cryptoCodes = this.cardPrices[0].cryptoCodes;
        this.cryptoValue = this.cardPrices[0].cryptoValue[this.cardPrices[0].cryptoValue.length - 1];
        this.prices24h = this.cardPrices[0].cryptoValue;
        await this.graph();
    }

    async selectCrypto(cryptoClass, index) {
        this.prices24h = [];
        this.ctrlCssColor = cryptoClass;
        this.ctrlCssColorIndex = index;
        this.prices24h = this.cardPrices[index].cryptoValue;
        this.selectedCrypto = this.cardPrices[index];
        this.cryptoCodes = this.selectedCrypto.cryptoCodes;
        this.cryptoValue = this.selectedCrypto.cryptoValue[this.selectedCrypto.cryptoValue.length - 1];
        await this.classSelector();
    }

    async graph() {
        const ctx = this.lineCanvas.nativeElement.getContext('2d');
        const gradientFill = ctx.createLinearGradient(262.48, 233, 316.52, 0);
        gradientFill.addColorStop(0.000, 'rgba(31, 230, 216, 0.510)');
        gradientFill.addColorStop(0.215, 'rgba(31, 230, 216, 0.431)');
        gradientFill.addColorStop(0.462, 'rgba(33, 229, 213, 0.769)');
        gradientFill.addColorStop(0.726, 'rgba(21, 233, 233, 1.000)');
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: new Array(this.prices24h.length),
                datasets: [
                    {
                        label: '',
                        data: this.prices24h,
                        backgroundColor: gradientFill,
                        borderColor: 'transparent',
                        borderWidth: 0,
                        pointRadius: 0,
                    }]
            },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    fullWidth: true,
                    display: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            drawBorder: false,
                            display: false
                        },
                        ticks: {
                            beginAtZero: false,
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            drawBorder: false,
                            display: false
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }]
                }, animation: {
                    duration: 500,
                },
                hover: {
                    animationDuration: 500,
                    mode: 'index',
                    intersect: false
                },
                responsiveAnimationDuration: 500
            }
        });
    }

    async classSelector() {
        if (this.ctrlCssColorIndex === 0) {
            await this.graph();
            this.cardPrices[0].fontClass = 'white';
            this.cardPrices[0].cryptoClass = 'crypto-card BTC';
            this.cardPrices[1].fontClass = '';
            this.cardPrices[1].cryptoClass = 'crypto-card';
            this.cardPrices[2].fontClass = '';
            this.cardPrices[2].cryptoClass = 'crypto-card';
            this.cardPrices[3].fontClass = '';
            this.cardPrices[3].cryptoClass = 'crypto-card';
            this.cardPrices[4].fontClass = '';
            this.cardPrices[4].cryptoClass = 'crypto-card';
            this.cardPrices[5].fontClass = '';
            this.cardPrices[5].cryptoClass = 'crypto-card';
        } else if (this.ctrlCssColorIndex === 1) {
            await this.graph();
            this.cardPrices[0].fontClass = '';
            this.cardPrices[0].cryptoClass = 'crypto-card';
            this.cardPrices[1].fontClass = 'white';
            this.cardPrices[1].cryptoClass = 'crypto-card ETH';
            this.cardPrices[2].fontClass = '';
            this.cardPrices[2].cryptoClass = 'crypto-card';
            this.cardPrices[3].fontClass = '';
            this.cardPrices[3].cryptoClass = 'crypto-card';
            this.cardPrices[4].fontClass = '';
            this.cardPrices[4].cryptoClass = 'crypto-card';
            this.cardPrices[5].fontClass = '';
            this.cardPrices[5].cryptoClass = 'crypto-card';
        } else if (this.ctrlCssColorIndex === 2) {
            await this.graph();
            this.cardPrices[0].fontClass = '';
            this.cardPrices[0].cryptoClass = 'crypto-card';
            this.cardPrices[1].fontClass = '';
            this.cardPrices[1].cryptoClass = 'crypto-card';
            this.cardPrices[2].fontClass = 'white';
            this.cardPrices[2].cryptoClass = 'crypto-card BCH';
            this.cardPrices[3].fontClass = '';
            this.cardPrices[3].cryptoClass = 'crypto-card';
            this.cardPrices[4].fontClass = '';
            this.cardPrices[4].cryptoClass = 'crypto-card';
            this.cardPrices[5].fontClass = '';
            this.cardPrices[5].cryptoClass = 'crypto-card';
        } else if (this.ctrlCssColorIndex === 3) {
            await this.graph();
            this.cardPrices[0].fontClass = '';
            this.cardPrices[0].cryptoClass = 'crypto-card';
            this.cardPrices[1].fontClass = '';
            this.cardPrices[1].cryptoClass = 'crypto-card';
            this.cardPrices[2].fontClass = '';
            this.cardPrices[2].cryptoClass = 'crypto-card ';
            this.cardPrices[3].fontClass = 'white';
            this.cardPrices[3].cryptoClass = 'crypto-card LTC';
            this.cardPrices[4].fontClass = '';
            this.cardPrices[4].cryptoClass = 'crypto-card';
            this.cardPrices[5].fontClass = '';
            this.cardPrices[5].cryptoClass = 'crypto-card';
        } else if (this.ctrlCssColorIndex === 4) {
            await this.graph();
            this.cardPrices[0].fontClass = '';
            this.cardPrices[0].cryptoClass = 'crypto-card';
            this.cardPrices[1].fontClass = '';
            this.cardPrices[1].cryptoClass = 'crypto-card';
            this.cardPrices[2].fontClass = '';
            this.cardPrices[2].cryptoClass = 'crypto-card ';
            this.cardPrices[3].fontClass = '';
            this.cardPrices[3].cryptoClass = 'crypto-card';
            this.cardPrices[4].fontClass = 'white';
            this.cardPrices[4].cryptoClass = 'crypto-card XMR';
            this.cardPrices[5].fontClass = '';
            this.cardPrices[5].cryptoClass = 'crypto-card';
        } else if (this.ctrlCssColorIndex === 5) {
            await this.graph();
            this.cardPrices[0].fontClass = '';
            this.cardPrices[0].cryptoClass = 'crypto-card';
            this.cardPrices[1].fontClass = '';
            this.cardPrices[1].cryptoClass = 'crypto-card';
            this.cardPrices[2].fontClass = '';
            this.cardPrices[2].cryptoClass = 'crypto-card ';
            this.cardPrices[3].fontClass = '';
            this.cardPrices[3].cryptoClass = 'crypto-card';
            this.cardPrices[4].fontClass = '';
            this.cardPrices[4].cryptoClass = 'crypto-card';
            this.cardPrices[5].fontClass = 'white';
            this.cardPrices[5].cryptoClass = 'crypto-card ZEC';
        }
    }

}
