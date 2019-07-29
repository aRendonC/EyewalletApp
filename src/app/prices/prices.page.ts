import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {Chart} from 'chart.js';
import {LoadingService} from '../services/loading/loading.service';
import {ToastService} from '../services/toast/toast.service';
import {environment} from '../../environments/environment';

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
    ctrlCssColor = '';
    private user: any;
    public bodyForm: any;
    public cardPrices = [];
    public urlFlags = environment.flag;
    public ctrlCssColorIndex = 0;
    public selectedCrypto: any;
    public cryptoCodes: any;
    public cryptoValue: any;

    constructor(
        private axios: AxiosService,
        private auth: AuthService,
        private store: Storage,
        protected aesjs: AesJsService,
        private loading: LoadingService,
        private toastCtrl: ToastService
    ) {
    }

    // Funcion de ciclo de vida (al cargar)
    async ngOnInit() {
        // Activa el Loader
        await this.loading.present({cssClass: 'textLoadingBlack'});
        // Obtiene el perfil desde el storage
        await this.getProfile();
        // Crea el body para hacer el request al Backend
        await this.buildBodyForm();
        // Se crea el request al backend para obtener las cryptos
        await this.getCryptoPrices24h();
        // Se obtiene el objeto que se va a renderizar en el Front
        await this.cardPricesBuilder();
        // Se inicializa en BTC
        this.cryptoCodes = this.cardPrices[0].cryptoCodes;
        // Se inicializa en  el precio actual del BTC
        this.cryptoValue = this.cardPrices[0].cryptoValue[this.cardPrices[0].cryptoValue.length - 1];
        // Se inicializa la grafica del Bitcoin
        this.prices24h = this.cardPrices[0].cryptoValue;
        await this.graph();
    }

    ionViewDidEnter(){
        let elementDashboard: any = document.getElementsByTagName('app-prices');
        elementDashboard[0].classList.add("margins-dashboard")
    }

    // Saca el profile del storage de Ionic
    async getProfile() {
        this.user = await this.store.get('profile');
        this.user = this.aesjs.decrypt(this.user);
    }

    // Crea un objeto con el userID para que el Backend me entregue los precios de las criptos
    buildBodyForm() {
        this.bodyForm = {
            userId: this.user.userId,
        };
    }

    // Obtiene los precios del Bitcoin de las ultimas 24 Horas
    async getCryptoPrices24h() {
        this.cryptoPrices24h = await this.axios.post('transaction/historyBTC', this.bodyForm, this.auth);
        if (this.cryptoPrices24h.status === 200) {
            this.cryptoPrices24h = this.cryptoPrices24h.data;
        } else {
            await this.toastCtrl.presentToast({text: 'Hubo un error interno, por favor reinicie la aplicación e intentalo de nuevo. Si el problema persiste contactese con nuestro equipo de soporte.'});
        }
    }

    // Esta funcion crea un array iterable con las 6 criptomonedas principales
    async cardPricesBuilder() {
        let criptos = [];
        this.cardPrices = this.cryptoPrices24h;
        this.cardPrices.forEach(cripto => {
            if (cripto.cryptoCodes === 'BTC' || cripto.cryptoCodes === 'ETH' ||
                cripto.cryptoCodes === 'BCH' || cripto.cryptoCodes === 'LTC' ||
                cripto.cryptoCodes === 'XMR' || cripto.cryptoCodes === 'ZEC') {
                criptos.push(cripto)
            }
        });
        this.cardPrices = criptos;
        this.cardPrices[0].cryptoClass = 'crypto-card BTC';
        this.cardPrices[0].fontClass = 'white';
        await this.loading.dismiss();
    }

// Se activa cuando le doy click a la criptomoneda que necesita el precio
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

// Crea una Grafica de criptos;
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
                labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                    '', '', '', '', '', '', '', '', '', '', '', ''],
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
