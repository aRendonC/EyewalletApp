import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
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
import validator from 'validator';
import { SlidersComponent } from '../components/sliders/sliders.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  @ViewChild(SlidersComponent) childD:SlidersComponent

  ctrlNavigation: boolean = false;
  transactionComponent: any
  public pockets: any = [];
  public profile: any;
  public params = {
    userId: null,
    type:  null,
    wallet_id: null,
    movement: null,
    limit: null
  };

  @Input() gra : SlidersComponent

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
      public loadingController: LoadingController,
      private routes: Router,
  ) {}

  async ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    this.getUserProfile();
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
  
  public getDataPocket(data: any) {
    console.log('estoy recibiendo data en la pagina dashboard', data);

    this.crypto.forEach(element => {
      element.graphic = [];
      if (data.pocket.currencyId === 1 && element.name === 'Bitcoin') {
        element.value = data.pocket.balance;

        data.data.forEach(elementGraphic => {
          element.graphic.push(parseFloat(elementGraphic.balance_after));
        });
      }
    });
    console.log('DataUpdata: ', this.crypto[0].graphic);

    this.childD.grafica();
  }


  getTransactionHistory(data: any){
    console.log(data)
    this.transactionComponent = data.data
    const btc = data.btc;
    console.log('este es el betece', btc)
    this.transactionComponent.forEach(element => {
      //
      const amountFinal = element.amount_finally;
      const amountDollar = (amountFinal * btc).toFixed(2);
      // extrae la hora de cada objeto
      const time = element.date.slice(11, 16);
      const dateFormat = `${element.date.slice(8, 10)}.${element.date.slice(5, 7)}.${element.date.slice(2, 4)}`;
      if (element.confirmation >= 0 && element.confirmation <= 2) {
        const confirmationText = 'Confirmando';
        // Agregar el elemento confirmationText al objeto transactions
        Object.assign(element, {confirmationText});
      } else {
        const confirmationText = 'Confirmado';
        // Agregar el elemento confirmationText al objeto transactions
        Object.assign(element, {confirmationText});
      }
      if (element.type === 1) {
        const plusMinus = '-';
        const typeIcon = '../../assets/img/balanceComponent/sent-icon.svg';
        // Agregar el elemento typeIcon y plusMinus al objeto transactions
        Object.assign(element, {typeIcon});
        Object.assign(element, {plusMinus});
      } else if (element.type === 0) {
        const typeIcon = '../../assets/img/balanceComponent/receive-icon.svg';
        const plusMinus = '+';
        // Agregar el elemento typeIcon y plusMinus al objeto transactions
        Object.assign(element, {typeIcon});
        Object.assign(element, {plusMinus});
      }
      // Agregar el elemento time al objeto transactions
      Object.assign(element, {time});
      // Agregar el elemento dateFormat al objeto transactions
      Object.assign(element, {dateFormat});
      // Agregar el elemento amountDollar al objeto transactions
      Object.assign(element, {amountDollar});
    });
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
    this.profile = profile;
    this.params.userId = profile.data.id;
    this.params.type = 4;

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
    console.log('todas mis transacciones', response)
    let dataTransaction = response.data;

    

    if(dataTransaction!=0){
      dataTransaction.forEach(element => {
        this.crypto.forEach(element1 => {
          if (element1.name === 'Bitcoin') {
            this.dataGraphic.push(parseFloat(element.balance_after));
          }
        });
      });
  
      this.crypto[0].graphic = this.dataGraphic;
    }else{
      this.crypto[0].graphic = [0,0,0,0,0,0,0,0,0,0,0,0];
      this.crypto[0].value=0;
    }

    
  }
}
