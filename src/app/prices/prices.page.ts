import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import { Chart } from 'chart.js';
import { ViewFlags } from '@angular/compiler/src/core';
import { TouchSequence } from 'selenium-webdriver';
import { LoadingService } from '../services/loading/loading.service';


@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {
  @Input() name: any;
  @ViewChild('lineCanvas') lineCanvas;
  public lineChart: any;
  public dataGraphic: any;
  public contentDataGrapic: any;
  public cryptoPrices24h: any;
  public historyCryptos: any;
  public ctrlNavigation = 3;
  public arrayBTC = [];
  public arrayETH = [];
  public arrayXMR = [];
  public arrayZEC = [];
  public prices24h = [];
  ctrlCssColor = '';
  ctrlCssColorFont = '';
  private user: any;
  public bodyForm: any;
  public cryptoPrices: any;
  public cardPrices: any = [];
  public ctrlCssColorIndex = 0;
  public selectedCrypto: any ;
  public cryptoCodes: any ;
  public cryptoValue: any ;
  constructor(
    private axios: AxiosService,
    private auth: AuthService,
    private store: Storage,
    protected aesjs: AesJsService,
    private loading: LoadingService
  ) { }

    // Funcion de ciclo de vida (al cargar)
    async ngOnInit() {
      this.loading.present({});
      await this.getProfile();
      await this.buildBodyForm();
      await this.getCryptoPrices();
      await this.getCryptoPrices24h();
      await this.parseCryptos();
      await this.cardPricesBuilder();
      this.cryptoCodes = this.cardPrices[0].cryptoCodes;
      this.cryptoValue = this.cardPrices[0].cryptoValue;
      this.prices24h = this.arrayBTC;
      await this.graph();
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

  // Obtiene los precios de las crytpos y deja la data que me interesa
  async getCryptoPrices() {
    this.cryptoPrices = await this.axios.post('transaction/priceBTC', this.bodyForm, this.auth);
    this.cryptoPrices = this.cryptoPrices.data;
  }

  // Parsea las crytos en objetos para poder consumirlas en el Frontend
  parseCryptos() {
    this.cryptoPrices = this.cryptoPrices.descripcion;
    this.cryptoPrices = JSON.parse(this.cryptoPrices);
  }

  // Obtiene los precios del Bitcoin de las ultimas 24 Horas
  async getCryptoPrices24h() {
    this.cryptoPrices24h = await this.axios.post('transaction/historyBTC', this.bodyForm, this.auth);
    this.cryptoPrices24h.data.forEach( element => {
      this.historyCryptos = JSON.parse(element.descripcion);
      this.arrayBTC.push(this.historyCryptos.BTC.USD);
      this.arrayETH.push(this.historyCryptos.ETH.USD);
      this.arrayXMR.push(this.historyCryptos.XMR.USD);
      this.arrayZEC.push(this.historyCryptos.ZEC.USD);
    });
  }

  // Esta funcion crea un array iterable con las 6 criptomonedas principales
  async cardPricesBuilder() {
    this.cardPrices = [
      {
        cryptoCodes: 'BTC',
        cryptoImage: '../../assets/images/pricesPage/bitcoinLogo.svg',
        cryptoClass: 'crypto-card Bitcoin',
        fontClass: 'white',
        cryptoName: 'Bitcoin',
        cryptoValue: this.cryptoPrices.BTC.USD
      },
      {
        cryptoCodes: 'ETH',
        cryptoImage: '../../assets/images/pricesPage/etherLogo.svg',
        cryptoClass: 'crypto-card',
        fontClass: '',
        cryptoName: 'Ethereum',
        cryptoValue: this.cryptoPrices.ETH.USD
      },
      {
        cryptoCodes: 'XMR',
        cryptoImage: '../../assets/images/pricesPage/moneroLogo.svg',
        cryptoClass: 'crypto-card',
        fontClass: '',
        cryptoName: 'Monero',
        cryptoValue: this.cryptoPrices.XMR.USD
      },
      {
        cryptoCodes: 'ZEC',
        cryptoImage: '../../assets/images/pricesPage/zLogo.svg',
        cryptoClass: 'crypto-card',
        fontClass: '',
        cryptoName: 'ZCash',
        cryptoValue: this.cryptoPrices.ZEC.USD
      },
      {
        cryptoCodes: 'BCH',
        cryptoImage: '../../assets/images/pricesPage/BCHLogo.svg',
        cryptoClass: 'crypto-card',
        fontClass: '',
        cryptoName: 'Bitcoin Cash',
        cryptoValue: this.cryptoPrices.BCH.USD
      },
      {
        cryptoCodes: 'LTC',
        cryptoImage: '../../assets/images/pricesPage/LTCLogo.svg',
        cryptoClass: 'crypto-card',
        fontClass: '',
        cryptoName: 'Litecoin',
        cryptoValue: this.cryptoPrices.LTC.USD
      }
    ];
    await this.loading.dismiss();
  }

// Se activa cuando le doy click a la criptomoneda que necesita el precio
  selectCrypto(cryptoClass, index) {
    this.ctrlCssColor = cryptoClass;
    this.ctrlCssColorIndex = index;
    this.selectedCrypto = this.cardPrices[index];
    this.cryptoCodes = this.selectedCrypto.cryptoCodes;
    this.cryptoValue = this.selectedCrypto.cryptoValue;
    this.classSelector();
  }

// Crea una Grafica de criptos;
async graph() {
  const ctx = this.lineCanvas.nativeElement.getContext('2d');
  const gradientFill = ctx.createLinearGradient(262.48, 233, 316.52, 0);
  gradientFill.addColorStop(0, 'rgba(0, 0, 0, 0.000)');
  gradientFill.addColorStop(0.7, 'rgba(21, 233, 233, 1.000)');
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets: [
            {
          label: '',
          data:  this.prices24h,
          backgroundColor: gradientFill,
          borderColor: 'transparent',
          borderWidth: 0,
          pointRadius: 0,
        }]
      },
      options: {
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
          duration: 7000,
        },
        hover: {
          animationDuration: 3000
        },
        responsiveAnimationDuration: 5000
      }
    });
}
  async classSelector() {
    if (this.ctrlCssColorIndex === 0) {
      this.prices24h = this.arrayBTC;
      await this.graph();
      this.cardPrices[0].fontClass = 'white';
      this.cardPrices[0].cryptoClass = 'crypto-card Bitcoin';
      this.cardPrices[1].fontClass = '';
      this.cardPrices[1].cryptoClass = 'crypto-card';
      this.cardPrices[2].fontClass = '',
      this.cardPrices[2].cryptoClass = 'crypto-card';
      this.cardPrices[3].fontClass = '';
      this.cardPrices[3].cryptoClass = 'crypto-card';
      this.cardPrices[4].fontClass = '';
      this.cardPrices[4].cryptoClass = 'crypto-card';
      this.cardPrices[5].fontClass = '';
      this.cardPrices[5].cryptoClass = 'crypto-card';
    } else if (this.ctrlCssColorIndex === 1) {
      this.prices24h = this.arrayETH;
      await this.graph();
      this.cardPrices[0].fontClass = '';
      this.cardPrices[0].cryptoClass = 'crypto-card';
      this.cardPrices[1].fontClass = 'white';
      this.cardPrices[1].cryptoClass = 'crypto-card Ethereum';
      this.cardPrices[2].fontClass = '';
      this.cardPrices[2].cryptoClass = 'crypto-card';
      this.cardPrices[3].fontClass = '';
      this.cardPrices[3].cryptoClass = 'crypto-card';
      this.cardPrices[4].fontClass = '';
      this.cardPrices[4].cryptoClass = 'crypto-card';
      this.cardPrices[5].fontClass = '';
      this.cardPrices[5].cryptoClass = 'crypto-card';
    } else if (this.ctrlCssColorIndex === 2) {
      this.prices24h = this.arrayXMR;
      await this.graph();
      this.cardPrices[0].fontClass = '';
      this.cardPrices[0].cryptoClass = 'crypto-card';
      this.cardPrices[1].fontClass = '';
      this.cardPrices[1].cryptoClass = 'crypto-card';
      this.cardPrices[2].fontClass = 'white';
      this.cardPrices[2].cryptoClass = 'crypto-card Monero';
      this.cardPrices[3].fontClass = '';
      this.cardPrices[3].cryptoClass = 'crypto-card';
      this.cardPrices[4].fontClass = '';
      this.cardPrices[4].cryptoClass = 'crypto-card';
      this.cardPrices[5].fontClass = '';
      this.cardPrices[5].cryptoClass = 'crypto-card';
    } else if (this.ctrlCssColorIndex === 3) {
      this.prices24h = this.arrayZEC;
      await this.graph();
      this.cardPrices[0].fontClass = '';
      this.cardPrices[0].cryptoClass = 'crypto-card';
      this.cardPrices[1].fontClass = '';
      this.cardPrices[1].cryptoClass = 'crypto-card';
      this.cardPrices[2].fontClass = '';
      this.cardPrices[2].cryptoClass = 'crypto-card ';
      this.cardPrices[3].fontClass = 'white';
      this.cardPrices[3].cryptoClass = 'crypto-card ZCash';
      this.cardPrices[4].fontClass = '';
      this.cardPrices[4].cryptoClass = 'crypto-card';
      this.cardPrices[5].fontClass = '';
      this.cardPrices[5].cryptoClass = 'crypto-card';
    } else if (this.ctrlCssColorIndex === 4) {
      this.prices24h = this.arrayZEC;
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
      this.cardPrices[4].cryptoClass = 'crypto-card BitcoinC';
      this.cardPrices[5].fontClass = '';
      this.cardPrices[5].cryptoClass = 'crypto-card';
    } else if (this.ctrlCssColorIndex === 5) {
      this.prices24h = this.arrayZEC;
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
      this.cardPrices[5].cryptoClass = 'crypto-card Litecoin';
    }
  }

}
