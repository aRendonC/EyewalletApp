import { Component, OnInit } from '@angular/core';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import { ViewFlags } from '@angular/compiler/src/core';
import { TouchSequence } from 'selenium-webdriver';



@Component({
  selector: 'app-prices',
  templateUrl: './prices.page.html',
  styleUrls: ['./prices.page.scss'],
})
export class PricesPage implements OnInit {

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
  ) { }

    // Funcion de ciclo de vida (al cargar)
    async ngOnInit() {
      await this.getProfile();
      await this.buildBodyForm();
      await this.getCryptoPrices();
      await this.parseCryptos();
      await this.cardPricesBuilder();
      this.cryptoCodes = this.cardPrices[0].cryptoCodes;
      this.cryptoValue = this.cardPrices[0].cryptoValue;
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

  // Esta funcion crea un array iterable con las 4 criptomonedas principales
  async cardPricesBuilder() {
    this.cardPrices = [
      {
        cryptoCodes: 'BTC',
        cryptoImage: '../../assets/images/pricesPage/bitcoinLogo.svg',
        cryptoClass: 'crypto-card',
        fontClass: '',
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
      }
    ];
  }


  selectCrypto(cryptoClass, index) {
    this.ctrlCssColor = cryptoClass;
    this.ctrlCssColorIndex = index;
    this.selectedCrypto = this.cardPrices[index];
    this.cryptoCodes = this.selectedCrypto.cryptoCodes;
    this.cryptoValue = this.selectedCrypto.cryptoValue;
    this.classSelector();

  }

  classSelector() {
    if (this.ctrlCssColorIndex === 0) {
      this.cardPrices[0].fontClass = 'white';
      this.cardPrices[0].cryptoClass = 'crypto-card Bitcoin';
      this.cardPrices[1].fontClass = '';
      this.cardPrices[1].cryptoClass = 'crypto-card';
      this.cardPrices[2].fontClass = '',
      this.cardPrices[2].cryptoClass = 'crypto-card';
      this.cardPrices[3].fontClass = '';
      this.cardPrices[3].cryptoClass = 'crypto-card';
    } else if (this.ctrlCssColorIndex === 1) {
      this.cardPrices[0].fontClass = '';
      this.cardPrices[0].cryptoClass = 'crypto-card';
      this.cardPrices[1].fontClass = 'white';
      this.cardPrices[1].cryptoClass = 'crypto-card Ethereum';
      this.cardPrices[2].fontClass = '';
      this.cardPrices[2].cryptoClass = 'crypto-card';
      this.cardPrices[3].fontClass = '';
      this.cardPrices[3].cryptoClass = 'crypto-card';
    } else if (this.ctrlCssColorIndex === 2) {
      this.cardPrices[0].fontClass = '';
      this.cardPrices[0].cryptoClass = 'crypto-card';
      this.cardPrices[1].fontClass = '';
      this.cardPrices[1].cryptoClass = 'crypto-card';
      this.cardPrices[2].fontClass = 'white';
      this.cardPrices[2].cryptoClass = 'crypto-card Monero';
      this.cardPrices[3].fontClass = '';
      this.cardPrices[3].cryptoClass = 'crypto-card';
    } else if (this.ctrlCssColorIndex === 3) {
      this.cardPrices[0].fontClass = '';
      this.cardPrices[0].cryptoClass = 'crypto-card';
      this.cardPrices[1].fontClass = '';
      this.cardPrices[1].cryptoClass = 'crypto-card';
      this.cardPrices[2].fontClass = '';
      this.cardPrices[2].cryptoClass = 'crypto-card ';
      this.cardPrices[3].fontClass = 'white';
      this.cardPrices[3].cryptoClass = 'crypto-card ZCash';
    }
  }
}
