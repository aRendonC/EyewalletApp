import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams, Platform,} from '@ionic/angular';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {AesJsService} from "../services/aesjs/aes-js.service";
import { AxiosService } from '../services/axios/axios.service';
import { DataLocalService } from "../services/data-local/data-local.service";

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.page.html',
  styleUrls: ['./pin-modal.page.scss'],
})
export class PinModalPage implements OnInit {
  @Input() modalTitle: string;
  @Input() modelID: number;
  @Input() sendCrypto;

  public pin: any = [];
  public ctrlPin: boolean = true;
  private currentRoute: string = null;

  constructor(
      private modalCtrl: ModalController,
      public navParams: NavParams,
      private faio: FingerprintAIO,
      private store: Storage,
      private router: Router,
      private platform: Platform,
      private aesjs: AesJsService,
      private api: AxiosService,
      private store2: DataLocalService,
  ) { }

  ngOnInit() {
    console.log("enviado desde send: ", this.sendCrypto);
    // console.table(this.modalTitle);
    this.currentRoute = this.router.url;
    this.modelID = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    this.platform.backButton.subscribeWithPriority(9999,() => {
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
      if(user) {
        user.pin = this.aesjs.decrypt(user.pin);
        if(pinData === user.pin.toString()) {
          if(this.sendCrypto === true){     
            await this.closeModal1(user.pin);
          }else{
            console.log("DATOS_PIN: ", user.profile.userId);
            
            //this.endpoint(valorChannel,1,useruuiid);            

            //let dataTransaction = response.data;
            //console.log("response", dataTransaction);
            user.pin = this.aesjs.encrypt(user.pin);
            this.store.set('user', user);
            await this.router.navigate(['/app/tabs/dashboard']);
            await this.closeModal()
          }
          let useruuiid = user.profile.userId;
          let valorChannel = await this.store2.getDataLocal('chanelSocket');
          console.log("CHANNEL: ", valorChannel);
          const result = await this.api.post('auth/logoutRemote', { channel: valorChannel, plattform: 1, userId: useruuiid, });
          // console.log("tales",result);
        } else {
          this.ctrlPin = false;
          setTimeout(() => {
            this.pin = []
          }, 500)
        }
      }
    }
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

  async endpoint(channell,valor1, useruuiid){
    const response = await this.api.post('auth/logoutRemote', { channel: channell, plattform: valor1, userId: useruuiid, });
    let dataTransaction = response.data;
    console.log("response", dataTransaction);
  }

}
