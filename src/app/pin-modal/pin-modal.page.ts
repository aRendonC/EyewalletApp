import {Component, Inject, Input, OnInit} from '@angular/core';
import {ModalController, NavParams, Platform,} from '@ionic/angular';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pin-modal',
  templateUrl: './pin-modal.page.html',
  styleUrls: ['./pin-modal.page.scss'],
})
export class PinModalPage implements OnInit {
  @Input() modalTitle: string;
  @Input() modelID: number;
  private pin: any = []
  public ctrlPin: boolean = true

  constructor(
      private modalCtrl: ModalController,
      public navParams: NavParams,
      private faio: FingerprintAIO,
      private store: Storage,
      private router: Router,
      private platform: Platform
  ) { }

  ngOnInit() {
    console.info(this.pin)
    console.table(this.navParams.data.paramTitle);
    // console.table(this.modalTitle);
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
    this.modalCtrl.dismiss(onCloseData);
  }

  async savePinData(number: number) {
    this.ctrlPin = true
    if (this.pin.length < 6) {
      this.pin.push(number)
      console.warn(this.pin)
    }
    if (this.pin.length === 6) {
      let pinData: string = ''
      this.pin.forEach(data => {
        pinData += data.toString()
      })
      console.log(pinData)
      let user = await this.store.get('user')
      console.log(user)
      if(user) {
        if(pinData === user.pin) {
          this.closeModal()
          this.router.navigate(['/app/tabs/profile']);
        } else {
          this.ctrlPin = false
          setTimeout(() => {
            this.pin = []
          }, 500)
        }
      }
    }
    console.warn(this.pin.length)
  }

  async deletePinData() {
    this.pin.splice(this.pin.length - 1, 1);
    console.info(this.pin)
  }

  showFingerPrint() {
    this.faio.isAvailable()
        .then(result => {
          console.log('huella avaliable', result)
          this.faio.show({
            clientId: 'Identificar de huella',
            clientSecret: 'password',   //Only necessary for Android
            disableBackup: false,  //Only for Android(optional)
            localizedFallbackTitle: 'Use Pin',      //Only for iOS
            localizedReason: 'Please authenticate', //Only for iOS

          })
              .then((result: any) => {
                console.log('huella verificada correctamente', result)
                this.router.navigate(['/app/tabs']);
                this.closeModal()
                // this.login();
                // this.isLocked = false;

              }).catch((error: any) => {
            console.log('entro al catch, cuando canelo', error)
            // this.openModal()
            // this.exitApp();
          });
        }).catch((error: any) => console.log('entro al carch sin cancelar', error));
  }

}
