import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {AxiosService} from "../services/axios/axios.service";
import {AuthService} from "../services/auth/auth.service";
import {AlertController, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {AesJsService} from "../services/aesjs/aes-js.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../services/loading/loading.service";

@Component({
  selector: 'app-send-cryptocurrencies',
  templateUrl: './send-cryptocurrencies.page.html',
  styleUrls: ['./send-cryptocurrencies.page.scss'],
})
export class SendCryptocurrenciesPage implements OnInit {
  @Input() public pockets: any = [];
    totalSend: any = null
    ctrlNavigation: boolean = true;
    isOn  = false;
    scanner: any;
    ctrlButtonSend: boolean = true;
    bodyForm: FormGroup;
    placeHolder: any = ''
    body = {
        amount: '',
        to_address: '',
        priority: '',
        from_address: '',
        pin: '',
        description: 'descripcion',
        currencyId: ''
    };
    fee: any = {
        data: null,
        estimated_network_fee: 0,
        error_message: null
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
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingService
  ) { }

  ngOnInit() {
      this.bodyForm = new FormGroup({
          amount: new FormControl('', Validators.compose([
              Validators.required,
              Validators.maxLength(8)
          ])),
          to_address: new FormControl('', Validators.compose([
              Validators.required
              ])),
          priority: new FormControl('', Validators.compose([
              Validators.required
          ])),
          from_address: new FormControl(''),
          description: new FormControl(''),
          currencyId: new FormControl(''),
          fee: new FormControl('')
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
                        this.placeHolder = text
                         this.bodyForm.get('to_address').setValue(text)
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

    async getFeeTransaction() {
      if(this.bodyForm.value.to_address && this.bodyForm.value.amount) {
          console.log(this.bodyForm);
          this.fee = await this.http.post('transaction/feeNetworkBTC', this.bodyForm.value, this.auth);
          this.fee = this.fee.data.data;
          if(this.fee.error_message) {
              this.totalSend = this.fee.error_message
          } else {
              this.totalSend = 'Total del envío ' + ((parseFloat(this.bodyForm.value.amount) + parseFloat(this.fee.estimated_network_fee)).toFixed(8))
              this.bodyForm.get('to_address').setValue((parseFloat(this.bodyForm.value.amount) + parseFloat(this.fee.estimated_network_fee)).toFixed(8))
          }
          console.log(this.fee)
          console.log(this.totalSend)
      } else {
          console.log('falta un campo')
      }
    }

    async sendCoin() {
        console.log(this.body.amount);
        console.log(this.pockets.balance);
        this.ctrlButtonSend = false;
        if(this.pockets.balance >= this.body.amount) {
            console.info('listo para enviar')
            await this.presentAlertSend()
        } else {
            await this.presentToast('No tiene fondos suficientes')
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
                            await this.loadingCtrl.present({})
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
                                await this.loadingCtrl.dismiss()
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
        await toast.present();
    }
}
