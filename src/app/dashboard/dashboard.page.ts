import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {VerificationModalPage} from '../verification-modal/verification-modal.page';
import {enterAnimation} from '../animations/enter';
import {leaveAnimation} from '../animations/leave';
import {DataLocalService} from '../services/data-local/data-local.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import { SlidersComponent } from '../components/sliders/sliders.component';
import {LoadingService} from '../services/loading/loading.service';
import {el} from "@angular/platform-browser/testing/src/browser_util";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  @ViewChild(SlidersComponent) childD: SlidersComponent;
  ctrlCssBlur: boolean = false
  ctrlNavigation = false;
  transactionComponent: any;
  public pockets: any = [];
  public profile: any;
  public params = {
    userId: null,
    type:  null,
    wallet_id: null,
    movement: null,
    limit: null
  };

  @Input() gra: SlidersComponent;

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
      public loadingController: LoadingService,
      private routes: Router,
  ) {}

  async ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    await this.getUserProfile();
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

  public async getDataPocket(data: any) {
    console.log('estoy recibiendo data en la pagina dashboard', data);

    this.crypto.forEach(element => {
      if (data.pocket.currencyId === 1 && element.name === 'Bitcoin') {
        element.value = data.pocket.balance;
        if(data.data[0]) {
          data.data.forEach(elementGraphic => {
            console.warn(elementGraphic)
            element.graphic.push(parseFloat(elementGraphic.balance_after));
          });
        }
      }
    });
    console.log('DataUpdata: ', this.crypto[0].graphic);
    this.getTransactionHistory(data)
    await this.childD.grafica();
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
      const time = element.date_transaction.slice(11, 16);
      const dateFormat = `${element.date_transaction.slice(8, 10)}.${element.date_transaction.slice(5, 7)}.${element.date_transaction.slice(2, 4)}`;
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
    this.ctrlCssBlur = true
    await this.loadingController.present({cssClass: 'textLoadingBlack'})
    let profile = await this.store.get('profile');
    console.info('Data profile: ', profile);
    if(!profile) {
       profile = await this.http.get('profile/1/view',this.auth, null);
      console.info(profile);
      profile = this.aesjs.encrypt(profile);
      await this.store.set('profile', profile)
      profile = this.aesjs.decrypt(profile)
    } else {
      profile = this.aesjs.decrypt(profile);
      console.info('Data profile: ', profile);
    }

    console.info('Estos son los datos del perfil luego de la api o del store', profile);
    this.profile = profile;
    this.params.userId = profile.data.id;
    this.params.type = 4;
    console.info('Parámetros para enviar a buscar: ', this.params);
    console.info('Parámetros del auth de usuario login o registrado', this.auth);
    let response = await this.http.post('transaction/index', this.params, this.auth);

    //llamar el listado de transacciones
    // await this.getListTransactions(this.params,this.auth);
    if(!this.pockets) {
      this.pockets = await this.store.get('pockets')
      console.info('estos son los pockets en el dashboard luego de registrame', this.pockets)
      if(this.pockets) {
        this.pockets = this.aesjs.decrypt(this.pockets)
      }
    }
    if(response.status === 200) {
      if(response.data[0]) {
        let usdbtc = response.btc;

        // let usd = JSON.parse(response.data[0].descripcion);
        console.table('históico transaccción', response)
        console.error('error del poket', this.pockets)
        this.crypto.forEach(element => {
          if (element.name === 'Bitcoin') {
            console.log('valor btc', usdbtc)
            element.value = this.pockets[0].balance
            element.valueUsd = this.pockets[0].balance * usdbtc.toFixed(8);
          }
        });
        this.ctrlCssBlur = false
        await this.loadingController.dismiss()
      } else {
        console.info('respuesta no es 200')
        console.info('respuesta no es 200',  this.crypto)
        console.info('respuesta no es 200',  this.pockets)
        this.crypto[0].graphic = [0,0,0,0,0,0,0,0,0,0,0,0];
        console.error('primera pockert', this.pockets[0].balance)
        console.error('primera pockert', this.crypto[0].graphic.length )
        this.crypto[0].value= this.pockets[0].balance;
        this.ctrlCssBlur = false
        await this.loadingController.dismiss()
      }
    } else {
      console.info('respuesta no es 200')
      console.info('respuesta no es 200',  this.crypto)
      console.info('respuesta no es 200',  this.pockets)
      this.crypto[0].graphic = [0,0,0,0,0,0,0,0,0,0,0,0];
      console.error('primera pockert', this.pockets[0].balance)
      console.error('primera pockert', this.crypto[0].graphic.length )
      this.crypto[0].value= this.pockets[0].balance;
      this.ctrlCssBlur = false
      await this.loadingController.dismiss()
    }
  }

  async getListTransactions(params, auth){

    let response = await this.http.post('transaction/all', params, auth);
    console.log('todas mis transacciones', response)
    let dataTransaction = response.data;



    if(dataTransaction[0]){
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
    this.ctrlCssBlur = false
    await this.loadingController.dismiss()
  }
}