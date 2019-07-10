import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams, ToastController} from '@ionic/angular';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {LoadingService} from "../services/loading/loading.service";

@Component({
  selector: 'app-list-pockets',
  templateUrl: './list-pockets.page.html',
  styleUrls: ['./list-pockets.page.scss'],
})
export class ListPocketsPage implements OnInit {
  ctrlButtonCreate: boolean = false;
  public ctrlCreatePocket: boolean = true;
  public params = {
    label: null,
    currencyId:  null,
    userId: null
  };
  public currencies: {} = [];
  private userId: number;
  @Input() pockets: any = [];

  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private http: AxiosService,
    private auth: AuthService,
    private store: Storage,
    protected aesjs: AesJsService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingService
      ) { }

  ngOnInit() {
    this.pockets = this.navParams.data.pockets;
    console.info('mis pockets en el modal', this.pockets);
    // this.activateRoute.params.subscribe(params => {
    //   this.pockets = params['pockets'];
    // });
  }

  async getCriptoCurrencies() {
    this.currencies = await this.http.get('currency/index', this.auth, null);
    console.log('estas son mis criptos', this.currencies)
  }

  async createPocket() {
    if (this.ctrlCreatePocket) {
      this.ctrlCreatePocket = false;
      await this.getCriptoCurrencies()
    } else {
      await this.loadingCtrl.present({})
      this.ctrlButtonCreate = true;
      let profile = await this.store.get('profile');
      profile = this.aesjs.decrypt(profile);
      profile = profile.data;
      console.info(profile);
      this.params.userId = profile.id;
      console.info(this.params);
      let response = await this.http.post('user-wallet/create', this.params, this.auth);
      console.info('poacket cerado', response);
      if(response.status === 200) {
        await this.loadingCtrl.dismiss()
        await this.presentToast();
        await this.closeModal(null)
      }
      await this.loadingCtrl.dismiss()
      this.ctrlButtonCreate = false
    }
  }

  async closeModal(pocket: object) {
    console.info(pocket);
    await this.modalCtrl.dismiss(pocket);
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Pocket creado correctamente',
      duration: 2000
    });
    await toast.present();
  }
  getIdCurrency(id:any) {
    console.log(id);
    this.params.currencyId = id
  }

  getData(event: any) {
    this.params.label = event;
    console.info(this.params)

  }
}
