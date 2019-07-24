import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {VerificationModalPage} from '../verification-modal/verification-modal.page';
import {PinModalPage} from '../pin-modal/pin-modal.page';
import {enterAnimation} from '../animations/enter';
import {leaveAnimation} from '../animations/leave';
import {DataLocalService} from '../services/data-local/data-local.service';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {SlidersComponent} from '../components/sliders/sliders.component';
import {LoadingService} from '../services/loading/loading.service';
import {BalanceComponent} from '../components/balance/balance.component';
import {filter} from 'rxjs/operators';
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit{
  public ctrlCssBlur: boolean = false;
  @ViewChild(SlidersComponent) childD: SlidersComponent;
  @ViewChild(BalanceComponent) balanceComponent: BalanceComponent;
  ctrlNavigation = 0;
  dataObservable: number = 1;
  location: any
  transactionComponent: any;
  public pockets: any = [];
  public profile: any;
  public params = {
    userId: null,
    type: null,
    wallet_id: null,
    movement: null,
    limit: null
  };

  @Input() gra: SlidersComponent;
  public crypto: any = [
    {
      name: '',
      background: '',
      value: '',
      graphic: []
    }
  ]
  // public crypto: any = [
  //   {name: 'Bitcoin', background: 'contentBitcoin', value: '', valueUsd: '', graphic: []},
  //   // {name: 'Ethereum', background: 'contentEtherium', value: '', valueUsd: '', graphic: []}
  // ];

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
    private router: Router,
  ) {
    this.router.events.pipe(
        filter(event => event instanceof NavigationStart)
    ).subscribe((route: NavigationStart) => {
      console.log('Route: ' + route.url);
      this.getTransactionsSend();
    });
  }

  async ngOnInit() {
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pockets'));
    await this.getUserProfile();
    await this.getListTransactions();
  }
  ionViewDidEnter(){
    let elementDashboard: any = document.getElementsByTagName('app-dashboard');
    console.log(elementDashboard);
    elementDashboard[0].classList.add("margins-dashboard")
  }

  async getTransactionsSend(){
    let transaction = await this.store.get('transaction');
    console.log(transaction);
    if(transaction) {
      console.log(transaction);
      await this.getDataPocket(transaction);
      await this.store.remove('transaction')
    }
  }

  async openModalVerification() {
    const modal = await this.modalCtrl.create({
      component: VerificationModalPage,
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
    });
    return await modal.present();
  }

  async Modal() {
    const modal = await this.modalCtrl.create({
      component: PinModalPage,
      enterAnimation,
      leaveAnimation,
    });
    return await modal.present();
  }

  private getUserId(): any {
    return this.storage.getDataLocal('profile');
  }

  public async getDataPocket(data: any) {
    this.crypto.forEach(element => {
      element.graphic = [];
      if (data.pocket.currencyId === 1) {
        element.value = data.pocket.balance;
        element.valueUsd = data.pocket.balance * data.btc.toFixed(8);
        if (data.data[0]) {
          // console.log(num ++)
          data.data.forEach(elementGraphic => {
            console.table(elementGraphic);
           element.graphic.push(parseFloat(elementGraphic.balance_after));
          });
        } else {
          element.graphic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
      }
    });
    this.crypto.amountPending = data.amountPending;
    await this.getTransactionHistory(data);
    await this.childD.grafica();
    await this.loadingController.dismiss()
  }

  async getTransactionHistory(data: any) {
    this.transactionComponent = data.data;
    const btc = data.btc;
    this.transactionComponent.forEach(element => {
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
    let profile = await this.store.get('profile');
    profile = await this.aesjs.decrypt(profile);
    this.profile = profile;
    this.params.userId = profile.userId;
    this.params.type = 4;
    console.log('pokets del usuario', this.pockets);
    if (!this.pockets) {
      this.pockets = await this.store.get('pockets');
      if (this.pockets) {
        this.pockets = this.aesjs.decrypt(this.pockets)
      }
    }
  }

  async getListTransactions() {
    await this.loadingController.present({text: 'Recopilando información', cssClass: 'textLoadingBlack'});
    this.ctrlCssBlur = true;

    let params = {
      userId: this.profile.userId,
      type: 0,
      address: this.pockets.address
    };
    let response = await this.http.post('transaction/index', params, this.auth);
    let dataTransaction = response.data;
    if (dataTransaction[0]) {
      await this.getTransactionHistory(response);
      dataTransaction.forEach(element => {
        this.crypto.forEach(element1 => {
          if (element1.name === 'Bitcoin') {
            element1.value = this.pockets.balance;
            element1.valueUsd = this.pockets.balance * response.btc.toFixed(8);
            this.dataGraphic.push(parseFloat(element.balance_after));
          }
        });
      });
      console.log(dataTransaction);
      this.crypto.amountPending = response.amountPending;
      this.crypto[0].graphic = this.dataGraphic;
    } else {
      this.crypto[0].graphic = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.crypto[0].value = 0;
    }

    await this.loadingController.dismiss();
    this.ctrlCssBlur = false;
  }
}
