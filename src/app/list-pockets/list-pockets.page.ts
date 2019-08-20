import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {AxiosService} from '../services/axios/axios.service';
import {AuthService} from '../services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {AesJsService} from '../services/aesjs/aes-js.service';
import {LoadingService} from "../services/loading/loading.service";
import {ToastService} from "../services/toast/toast.service";
import {DataLocalService} from "../services/data-local/data-local.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-list-pockets',
  templateUrl: './list-pockets.page.html',
  styleUrls: ['./list-pockets.page.scss'],
})
export class ListPocketsPage implements OnInit {
  public ctrlCssBlur = false;
  ctrlButtonCreate: boolean = false;
  public ctrlCreatePocket: boolean = true;
  public params = {
    label: null,
    currencyId:  null,
    userId: null
  };
  public currencies: any = [];
  private userId: number;
  @Input() pockets: any = [];

  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private http: AxiosService,
    private auth: AuthService,
    private store: DataLocalService,
    private toastCtrl: ToastService,
    private loadingCtrl: LoadingService,
    private translateService: TranslateService,
      ) { }

  ngOnInit() {
    this.pockets = this.navParams.data.pockets;
    console.log('UNO: ', this.pockets);
  }

  async getCriptoCurrencies() {
    this.currencies = await this.http.get('currency/index', this.auth, null);
    this.currencies = this.currencies.data
  }

  async createPocket() {
    if (this.ctrlCreatePocket) {
      this.ctrlCreatePocket = false;
      await this.getCriptoCurrencies()
    } else {
      let endPoint = '';
      if( this.params.label) {
        if(this.params.currencyId == 3 ){
          endPoint = 'ethereum/create'
        } else {
          endPoint = 'user-wallet/create'
        }
        await this.loadingCtrl.present({text: this.translateService.instant('LIST_POCKETS.CreatingPocket'), cssClass: 'textLoadingBlack'});
        this.ctrlCssBlur = true;
        this.ctrlButtonCreate = true;
        let profile = await this.store.getDataLocal('profile');
        this.params.userId = profile.id;
        console.log(this.params);
        console.log(endPoint);
        let response = await this.http.post(endPoint, this.params, this.auth);
        console.log('los poackets cuando creo uno nuevo',response);
        if(response.status === 200) {
          this.ctrlCssBlur = false;
          await this.loadingCtrl.dismiss();
          await this.toastCtrl.presentToast({text: this.translateService.instant('LIST_POCKETS.PocketCreatedOk')});
          await this.store.setDataLocal('pocket-created', true);
          await this.closeModal(response.data, 'new-pocket')
        } else {
          this.ctrlCssBlur = false;
          await this.toastCtrl.presentToast({text: response.error.msg});
          await this.loadingCtrl.dismiss();
          this.ctrlButtonCreate = false
        }
      }
    }
  }

  async closeModal(pocket: object, role: string = null ) {
    await this.modalCtrl.dismiss(pocket, role);
  }
  getIdCurrency(id:any) {
    this.params.currencyId = id
  }

  getData(event: any) {
    this.params.label = event;
  }
}
