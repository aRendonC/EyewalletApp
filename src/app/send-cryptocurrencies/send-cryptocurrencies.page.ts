import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {AxiosService} from "../services/axios/axios.service";
import {AuthService} from "../services/auth/auth.service";
import {AlertController, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-send-cryptocurrencies',
  templateUrl: './send-cryptocurrencies.page.html',
  styleUrls: ['./send-cryptocurrencies.page.scss'],
})
export class SendCryptocurrenciesPage implements OnInit {
  @Input() public pockets: any = [];
    ctrlNavigation: boolean = true;
    isOn  = false;
    scanner: any;
    ctrlButtonSend: boolean = true;
    bodyForm: FormGroup;
    body = {
        amount: '',
        to_address: '',
        priority: '',
        from_address: '',
        pin: '',
        description: 'descripcion',
        currencyId: ''
    };
    fee = {
        data: null,
        estimated_network_fee: 0
    };
    scanSub: any;
  constructor(
      private route: ActivatedRoute,
      private qrScanner: QRScanner,
      private http: AxiosService,
      protected auth: AuthService,
      private alerrtCtrl: AlertController,
      protected store: Storage,
      private aesjs: AesJsService,
      private toastCtrl: ToastController
  ) { }

  ngOnInit() {
      this.bodyForm = new FormGroup({
          amount: new FormControl('', Validators.compose([
              Validators.minLength(6),
              Validators.required,
              Validators.maxLength(6)
          ])),
          to_address: new FormControl('', Validators.compose([
              Validators.required
              ])),
          priority: new FormControl('', Validators.compose([
              Validators.required
          ])),
          from_address: new FormControl(''),
          description: new FormControl(''),
          currencyId: new FormControl('')
      })
    this.pockets = JSON.parse(this.route.snapshot.paramMap.get('pocket'));
    console.log(this.pockets);
      this.body.from_address = this.pockets.address
  }

    presentQRScanner() {
        this.qrScanner.prepare()
            .then(async (status: QRScannerStatus) => {
                if (status.authorized) {
                    this.isOn = true;

                    // start scanning
                     this.scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
                        console.log('Scanned something', text);
                        this.body.to_address = text;
                        await this.unSuscribed()
                    });

                    await this.qrScanner.show();


                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                    this.qrScanner.openSettings();
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));
    }

    async unSuscribed() {
        this.isOn = false;
        console.log(this.isOn);
        let element = document.getElementById('QRScaner');
        element.classList.remove('show-qr-scanner');
       await this.qrScanner.destroy();
        this.scanSub.unsubscribe();
    }

    async getFeeTransaction(event) {
        console.log(event);
        console.log(this.bodyForm);
        this.fee = await this.http.post('transaction/feeNetworkBTC', this.bodyForm.value, this.auth);
        this.fee = this.fee.data.data;
        console.log(this.fee)
    }

    async sendCoin() {
        console.log(this.body.amount);
        console.log(this.pockets.balance);
        this.ctrlButtonSend = false;
        if(this.pockets.balance >= this.body.amount) {
            console.info('listo para enviar')
            await this.presentAlertSend()
        } else {
            console.info('no tiene fondos')
        }
    }

    async presentAlertSend() {
        const alert = await this.alerrtCtrl.create({
            backdropDismiss: false,
            header: 'Ingresa tu PIN',
            keyboardClose: false,
            inputs: [
                {
                    name: 'pin',
                    type: 'text',
                    placeholder: 'Ingrese su pin',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (alertData) => {
                        this.ctrlButtonSend = true;
                        console.log(alertData);
                    }
                }, {
                    text: 'Ok',
                    handler: async (alertData) => {
                        let security = await this.store.get('user')
                        console.log(security)
                        security = this.aesjs.decryptNoJson(security.pin)
                        console.log(security)
                        console.log(alertData.pin)
                        if(security === alertData.pin) {
                            security = this.aesjs.encryptNoJson(security)
                            this.bodyForm.value.currencyId = this.pockets.currencyId
                            this.bodyForm.value.pin = security
                            this.bodyForm.value.from_address = this.pockets.address
                            console.log('pin encriptado', security)
                            console.log('envió')
                            console.log(this.bodyForm)
                            let response = await this.http.post('transaction/sendBTC', this.bodyForm.value, this.auth)
                            console.log(response)
                            if (response.status === 200) {
                               await this.presentToast('Transacción realizada con éxito')
                            } else {
                                await this.presentToast('Hubo un error')
                            }
                        } else {
                            await this.presentToast('Pin incorrecto')
                        }
                        this.ctrlButtonSend = true;
                        console.log(alertData);
                        console.log('Confirm Ok');
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentToast(text) {
        const toast = await this.toastCtrl.create({
            message: text,
            duration: 2000
        });
        toast.present();
    }
}
