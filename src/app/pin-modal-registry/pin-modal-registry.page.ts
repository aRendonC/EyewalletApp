import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform, } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { LoadingService } from "../services/loading/loading.service";
import { DeviceService } from '../services/device/device.service';
import { AxiosService } from '../services/axios/axios.service';
import { AuthService } from '../services/auth/auth.service';
import { DataLocalService } from '../services/data-local/data-local.service';
import * as utils from '../../assets/utils';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { AesJsService } from '../services/aesjs/aes-js.service';
import { SocketIoService } from '../services/socketIo/socket-io.service';

@Component({
  selector: 'app-pin-modal-registry',
  templateUrl: './pin-modal-registry.page.html',
  styleUrls: ['./pin-modal-registry.page.scss'],
})
export class PinModalRegistryPage implements OnInit {

  @Input() modalTitle: string;
  @Input() modelID: number;
  @Input() userPin;
  @Input() passwordPin;

  public ctrlCssBlur = false;
  public pin: any = [];
  public ctrlPin: boolean = true;
  private currentRoute: string = null;
  private email:string = null;
  public bodyForm = {
    pin: null,
    device: null,
    userId: null
  };
  private devic: any = {};
  public pockets: any = [];
  public buttonDisabled: boolean;
  private user: any = null;

  constructor(
    private axios: AxiosService,
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private store: Storage,
    private router: Router,
    private platform: Platform,
    private loadingCtrl: LoadingService,
    private store1: DataLocalService,
    private auth: AuthService,
    private device: DeviceService,
    private faio: FingerprintAIO,
    private aesJ: AesJsService,
    private socket: SocketIoService,
    ) { }

  ngOnInit() {
    this.user = this.userPin;
    this.userPin.data.password = this.passwordPin;
    console.log(this.userPin.password);
    this.currentRoute = this.router.url;
    this.modelID = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.platform.backButton.subscribeWithPriority(9999, () => {
      document.addEventListener('backbutton', function (event) {
        event.preventDefault();
        event.stopPropagation();
        console.log('hello');
      }, false);
    })
  }

  async closeModal() {
    const onCloseData = 'Wrapped Up!';
    await this.modalCtrl.dismiss(onCloseData);
  }

  async closeModal1(val) {
    const onCloseData = val;
    await this.modalCtrl.dismiss(onCloseData);
  }

  async savePinData(number: number) {
    this.ctrlPin = true;
    if (this.pin.length < 6) {
      this.pin.push(number);
    }
    if (this.pin.length === 6) {
      let pinData: string = '';
      this.pin.forEach(data => {
        pinData += data.toString()
      });
      let user = await this.store.get('user');
      console.log("user: ", pinData);
      if (pinData) {
        //user.pin = this.aesjs.decrypt(pinData);
        if (pinData === pinData) {
          //va el registro
          this.registroModal(pinData);
        } else {
          this.ctrlPin = false;
          setTimeout(() => {
            this.pin = []
          }, 500)
        }
      }
    }
  }

  async registroModal(pinData){
    await this.loadingCtrl.present({ text: "Registrando tu informacion" });
    this.ctrlCssBlur = true;

    this.devic = await this.device.getDataDevice();
    if (!this.devic.uuid) this.devic.uuid = 'asd6544asd';
    this.bodyForm.device = this.devic;
    this.bodyForm.userId = this.userPin.data.id;
    this.bodyForm.pin = pinData;
    const plattform = 1;
    let channel = await this.createChannel();
    
    const response = await this.axios.put(`profile/${this.userPin.data.id}/pin`, this.bodyForm, this.auth);
    if (response.status === 200) {
      let pass = this.passwordPin.replace(/['"]+/g,'');
      let loginUser: any = await this.auth.login(this.userPin.data.email, pass, plattform, channel);
      if (loginUser.status === 200) {
        await this.socket.initSocket(channel);
        this.pockets = await this.getPocketsList();
        await this.store1.setDataLocal('pockets', this.pockets);
        let pocket = this.pockets[0];
        this.store1.setDataLocal('selected-pocket', pocket);
        await this.router.navigate(['/app/tabs/dashboard']);
        this.modalCtrl.dismiss();
        await this.loadingCtrl.dismiss();
        
        this.ctrlCssBlur = false;
      }
      else {
        await this.loadingCtrl.dismiss();
        this.ctrlCssBlur = false;
      }
    } else {
      await this.loadingCtrl.dismiss();
      this.ctrlCssBlur = false;
    }
  }
  public validatePin(pinNumber): void {
    this.buttonDisabled = !utils.validatePinRegistry(pinNumber);
  }

  async getPocketsList() {
    return await this.axios.post('user-wallet/index', { currencyId: '' }, this.auth);
  }

  async deletePinData() {
    this.pin.splice(this.pin.length - 1, 1);
  }

  showFingerPrint() {
    this.faio.isAvailable()
      .then(result => {
        this.faio.show({
          clientId: 'Identificar de huella',
          clientSecret: 'password',   //Only necessary for Android
          disableBackup: false,  //Only for Android(optional)
          localizedFallbackTitle: 'Use Pin',      //Only for iOS
          localizedReason: 'Please authenticate', //Only for iOS

        })
          .then((result: any) => {
            this.router.navigate(['/app/tabs/dashboard']);
            this.closeModal()
            // this.login();
            // this.isLocked = false;

          }).catch((error: any) => {
            // this.openModal()
            // this.exitApp();
          });
      }).catch((error: any) => console.log('entro al carch sin cancelar', error));
  }

  async createChannel() {
    const dates = new Date().toString();
    const rando = Math.random();
    const valor = this.aesJ.encrypt(rando + dates);
    return valor;
  }
}
