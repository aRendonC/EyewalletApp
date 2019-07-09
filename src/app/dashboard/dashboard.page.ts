import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModalController,LoadingController} from '@ionic/angular';
import {VerificationModalPage} from '../verification-modal/verification-modal.page';
import {enterAnimation} from '../animations/enter';
import {leaveAnimation} from '../animations/leave';
import {DataLocalService} from '../services/data-local/data-local.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import { EmptyOutletComponent } from '@angular/router/src/components/empty_outlet';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  ctrlNavigation: boolean = false;
  public pockets: any = [];
  public params = {
    userId: null,
    type:  null,
    wallet_id: null,
    movement: null,
    limit: null
  };

  public crypto: any = [
    {name: 'Bitcoin', background: 'contentBitcoin', value: '', valueUsd: '', graphic: []},
    {name: 'Ethereum', background: 'contentEtherium', value: '', valueUsd: '', graphic: []}
  ];

  public dataGraphic = [];
  public dataArrayGraphic = [];

  constructor(
      private route: ActivatedRoute,
      private modalCtrl: ModalController,
      private storage: DataLocalService,
      private http: AxiosService,
      private auth: AuthService,
      private store: Storage,
      protected aesjs: AesJsService,
      public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    this.getUserProfile();

    console.log('gklajdfklsajd', this.crypto);
  }

  async openModalVerification() {
    const modal = await this.modalCtrl.create({
      component: VerificationModalPage,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
    });

    return await modal.present();
  }

  private getUserId(): any {
    return this.storage.getDataLocal('profile');
  }
  getDataPocket(data: []) {
    console.log('estoy recibiendo data en la pagina dashboard', data)
  }
  send() {

  }

  receive() {

  }

  priceBtc() {

  }

  async getUserProfile() {
    const loading = await this.loadingController.create({
      message: '',
      duration: 7000
    });
    await loading.present();

    let profile = await this.store.get('profile');

    profile = this.aesjs.decrypt(profile);
    console.info('Data profile: ', profile);

    this.params.userId = profile.data.id;
    this.params.type = 4;
    // console.info('Data params: ', this.params);

    let response = await this.http.post('transaction/historyBTC', this.params, this.auth);

    //llamar el listado de transacciones
    this.getListTransactions(this.params,this.auth);

    let usdbtc = JSON.parse(response.data[0].dolar);

    let usd = JSON.parse(response.data[0].descripcion);

    this.crypto.forEach(element => {
      if (element.name === 'Bitcoin') {
        element.value = usdbtc.USDBTC.toFixed(8);
        element.valueUsd = usd.BTC.USD.toFixed(2);
      }
    });
  }

  async getListTransactions(params, auth){
    let response = await this.http.post('transaction/all', params, auth);
    let dataTransaction = response.data;

    dataTransaction.forEach(element => {
      console.log(element.balance_after);

      this.crypto.forEach(element1 => {
        if (element1.name === 'Bitcoin') {
          this.dataGraphic.push(parseFloat(element.balance_after));
        }
      });
    });

    this.crypto[0].graphic = this.dataGraphic;
  }

}
