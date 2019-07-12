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

  // Saca el profile del storage de Ionic
  async getProfile() {
    this.user = await this.store.get('profile');
    this.user = this.aesjs.decrypt(this.user);
  }

  // Crea un objeto con el userID para que el Backend me entregue los precios de las criptos
  buildBodyForm() {
    this.bodyForm = {
      userId: this.user.data.userId,
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
        cryptoName: 'Bitcoin',
        cryptoValue: this.cryptoPrices.BTC.USD
      },
      {
        cryptoCodes: 'ETH',
        cryptoImage: '../../assets/images/pricesPage/etherLogo.svg',
        cryptoName: 'Ethereum',
        cryptoValue: this.cryptoPrices.ETH.USD
      },
      {
        cryptoCodes: 'XMR',
        cryptoImage: '../../assets/images/pricesPage/moneroLogo.svg',
        cryptoName: 'Monero',
        cryptoValue: this.cryptoPrices.XMR.USD
      },
      {
        cryptoCodes: 'ZEC',
        cryptoImage: '../../assets/images/pricesPage/zLogo.svg',
        cryptoName: 'ZCash',
        cryptoValue: this.cryptoPrices.ZEC.USD
      }
    ];
  }

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

  selectCrypto(cryptoName, index) {
    this.ctrlCssColor = cryptoName;
    this.ctrlCssColorIndex = index;
    this.selectedCrypto = this.cardPrices[index];
    this.cryptoCodes = this.selectedCrypto.cryptoCodes;
    this.cryptoValue = this.selectedCrypto.cryptoValue;
    this.ctrlCssColorFont = 'white';
    // if (this.ctrlCssColor === false) {
    //   this.ctrlCssColor = true;
    // } else if (this.ctrlCssColor === true) {
    //   this.ctrlCssColor = false;
    // }
  }
}
